const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.25;
const STAGE_PADDING = 32;

async function initAllViewers() {
  const containers = document.querySelectorAll(".pdf-viewer[data-pdf-url]");
  if (!containers.length) return;

  const scriptEl = document.getElementById("pdf-viewer-script");
  const pdfjsSrc = scriptEl?.dataset.pdfjsSrc;
  const workerSrc = scriptEl?.dataset.pdfjsWorker;

  if (!pdfjsSrc || !workerSrc) {
    containers.forEach(showError);
    return;
  }

  let pdfjsLib;
  try {
    pdfjsLib = await import(pdfjsSrc);
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  } catch (err) {
    console.error("Failed to load PDF.js:", err);
    containers.forEach(showError);
    return;
  }

  containers.forEach((container) => initViewer(container, pdfjsLib));
}

function showError(container) {
  const statusEl = container.querySelector('[data-role="status"]');
  const canvasEl = container.querySelector('[data-role="canvas"]');
  const errorEl = container.querySelector('[data-role="error"]');
  if (statusEl) statusEl.hidden = true;
  if (canvasEl) canvasEl.hidden = true;
  if (errorEl) errorEl.hidden = false;
}

function initViewer(container, pdfjsLib) {
  const url = container.dataset.pdfUrl;
  const initialPage = Math.max(1, parseInt(container.dataset.initialPage || "1", 10) || 1);

  const stage = container.querySelector('[data-role="stage"]');
  const canvas = container.querySelector('[data-role="canvas"]');
  const statusEl = container.querySelector('[data-role="status"]');
  const prevBtn = container.querySelector('[data-action="prev"]');
  const nextBtn = container.querySelector('[data-action="next"]');
  const pageInput = container.querySelector('[data-role="page-input"]');
  const pageCountEl = container.querySelector('[data-role="page-count"]');
  const zoomOutBtn = container.querySelector('[data-action="zoom-out"]');
  const zoomInBtn = container.querySelector('[data-action="zoom-in"]');
  const zoomFitBtn = container.querySelector('[data-action="zoom-fit"]');

  const ctx = canvas.getContext("2d");

  let pdfDoc = null;
  let currentPage = initialPage;
  let zoomMode = "fit"; // "fit" | "custom"
  let customScale = 1.0;
  let currentRenderTask = null;
  let pendingRender = false;

  function updateControls() {
    if (!pdfDoc) return;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= pdfDoc.numPages;
    pageInput.value = String(currentPage);
    pageInput.max = String(pdfDoc.numPages);
    pageCountEl.textContent = String(pdfDoc.numPages);
    zoomFitBtn.textContent = zoomMode === "fit" ? "Fit" : `${Math.round(customScale * 100)}%`;
  }

  async function renderPage() {
    if (!pdfDoc) return;

    if (currentRenderTask) {
      pendingRender = true;
      currentRenderTask.cancel();
      return;
    }

    try {
      const page = await pdfDoc.getPage(currentPage);
      const baseViewport = page.getViewport({ scale: 1 });

      let cssScale;
      if (zoomMode === "fit") {
        const availableWidth = Math.max(240, stage.clientWidth - STAGE_PADDING);
        cssScale = availableWidth / baseViewport.width;
      } else {
        cssScale = customScale;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const cssViewport = page.getViewport({ scale: cssScale });
      const outputViewport = page.getViewport({ scale: cssScale * dpr });

      canvas.width = Math.floor(outputViewport.width);
      canvas.height = Math.floor(outputViewport.height);
      canvas.style.width = `${Math.floor(cssViewport.width)}px`;
      canvas.style.height = `${Math.floor(cssViewport.height)}px`;

      const renderTask = page.render({
        canvasContext: ctx,
        viewport: outputViewport,
      });
      currentRenderTask = renderTask;

      await renderTask.promise;
      currentRenderTask = null;

      statusEl.hidden = true;
      canvas.hidden = false;
      updateControls();

      if (pendingRender) {
        pendingRender = false;
        renderPage();
      }
    } catch (err) {
      currentRenderTask = null;
      if (err?.name === "RenderingCancelledException") {
        if (pendingRender) {
          pendingRender = false;
          renderPage();
        }
        return;
      }
      console.error("Error rendering PDF page:", err);
      showError(container);
    }
  }

  function goToPage(pageNum) {
    if (!pdfDoc) return;
    const clamped = Math.min(Math.max(1, pageNum), pdfDoc.numPages);
    if (clamped === currentPage) {
      pageInput.value = String(currentPage);
      return;
    }
    currentPage = clamped;
    stage.scrollTop = 0;
    updateControls();
    renderPage();
  }

  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

  pageInput.addEventListener("change", () => {
    const target = parseInt(pageInput.value, 10);
    if (Number.isFinite(target)) {
      goToPage(target);
    } else {
      pageInput.value = String(currentPage);
    }
  });

  zoomInBtn.addEventListener("click", async () => {
    if (!pdfDoc) return;
    if (zoomMode === "fit") {
      const page = await pdfDoc.getPage(currentPage);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(240, stage.clientWidth - STAGE_PADDING);
      customScale = availableWidth / baseViewport.width;
      zoomMode = "custom";
    }
    customScale = Math.min(MAX_ZOOM, Math.round((customScale + ZOOM_STEP) * 100) / 100);
    updateControls();
    renderPage();
  });

  zoomOutBtn.addEventListener("click", async () => {
    if (!pdfDoc) return;
    if (zoomMode === "fit") {
      const page = await pdfDoc.getPage(currentPage);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(240, stage.clientWidth - STAGE_PADDING);
      customScale = availableWidth / baseViewport.width;
      zoomMode = "custom";
    }
    customScale = Math.max(MIN_ZOOM, Math.round((customScale - ZOOM_STEP) * 100) / 100);
    updateControls();
    renderPage();
  });

  zoomFitBtn.addEventListener("click", () => {
    if (!pdfDoc) return;
    zoomMode = "fit";
    updateControls();
    renderPage();
  });

  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      goToPage(currentPage + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goToPage(currentPage - 1);
    }
  });

  let resizeTimer = null;
  if (typeof ResizeObserver !== "undefined") {
    let lastWidth = stage.clientWidth;
    const ro = new ResizeObserver(() => {
      if (zoomMode !== "fit") return;
      if (Math.abs(stage.clientWidth - lastWidth) < 4) return;
      lastWidth = stage.clientWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => renderPage(), 150);
    });
    ro.observe(stage);
  }

  pdfjsLib
    .getDocument(url)
    .promise.then((doc) => {
      pdfDoc = doc;
      currentPage = Math.min(Math.max(1, initialPage), pdfDoc.numPages);
      updateControls();
      renderPage();
    })
    .catch((err) => {
      console.error("Failed to load PDF document:", err);
      showError(container);
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllViewers);
} else {
  initAllViewers();
}
