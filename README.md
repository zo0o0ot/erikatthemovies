# Erik at the Movies

A movie review portfolio site built with Hugo and the Blowfish theme, featuring an animated background and custom social media icons.

Live site: https://zo0o0ot.github.io/erikatthemovies/

## Table of Contents

- [Quick Start for Forking](#quick-start-for-forking)
- [Customizing Your Site](#customizing-your-site)
- [Adding Movie Reviews](#adding-movie-reviews)
- [Adding PDF Reviews and Documents](#adding-pdf-reviews-and-documents)
- [Adding Content to Archives](#adding-content-to-archives)
- [Adding Images and Movie Posters](#adding-images-and-movie-posters)
- [Local Development](#local-development)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)

## Quick Start for Forking

If you're forking this repository to create your own movie review site:

1. **Fork the repository** on GitHub to your account
2. **Update repository settings**:
   - Go to Settings > Pages
   - Set Source to "GitHub Actions"
3. **Customize your information** (see next section)
4. **Push changes** - GitHub Actions will automatically deploy your site

Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Customizing Your Site

### Update Author Information

Edit `config/_default/languages.en.toml`:

```toml
[author]
  name = "Your Name"                    # Your full name
  image = "img/yourphoto.jpg"          # Path to your photo (see below)
  headline = "Your headline here"       # Short description
  bio = "Your bio here"                 # Longer bio text
  links = [
    { letterboxd = "https://letterboxd.com/yourusername" },
    # Add other social links:
    # { twitter = "https://twitter.com/yourusername" },
    # { github = "https://github.com/yourusername" },
  ]
```

**Important**: Your profile image must be stored locally in the `assets/img/` directory (not an external URL). For example:

1. Save your photo as `assets/img/yourphoto.jpg`
2. Set `image = "img/yourphoto.jpg"` in the config
3. Add the file to git: `git add assets/img/yourphoto.jpg`

### Update Site Details

Edit `config/_default/hugo.toml`:

```toml
baseURL = "https://YOUR_USERNAME.github.io/REPO_NAME/"
title = "Your Site Title"

[author]
  name = "Your Name"
  email = "your.email@example.com"
```

### Change Background Colors

The animated background uses three shades of blue. To customize the colors:

1. Open `static/img/background.svg`
2. Find and replace the color hex codes:
   - Light blue: `#93dbe9` (currently used)
   - Medium blue: `#689cc5`
   - Dark blue: `#5e6fa3`
3. Replace with your preferred colors

Example using command line:
```bash
sed -i 's/#93dbe9/#YOUR_COLOR_1/g' static/img/background.svg
sed -i 's/#689cc5/#YOUR_COLOR_2/g' static/img/background.svg
sed -i 's/#5e6fa3/#YOUR_COLOR_3/g' static/img/background.svg
```

### Add Custom Social Media Icons

If you need a social media or affiliation icon not included in the Blowfish theme:

1. Create an SVG (e.g., `letterboxd.svg`) or PNG/WebP (e.g., `mnfca.png`) file named after the platform
2. Save it in `assets/icons/`
3. Add a matching entry under `[params.author]` `links` in `config/_default/languages.en.toml`

See `assets/icons/letterboxd.svg` and `assets/icons/mnfca.png` for examples.

### Customize Post Templates (Archetypes)

Hugo uses **archetype** files in the `archetypes/` folder as starter templates whenever you run `hugo new content`. Edit these files directly to change your default author name, tags, front matter fields, or review headings:

| Archetype File | Command That Uses It | Purpose |
| :--- | :--- | :--- |
| [`archetypes/reviews/index.md`](archetypes/reviews/index.md) | `hugo new content reviews/<slug>` or `hugo new content --kind reviews archives/<slug>` | Standard movie review page bundle |
| [`archetypes/pdf-review/index.md`](archetypes/pdf-review/index.md) | `hugo new content --kind pdf-review reviews/<slug>` or `archives/<slug>` | PDF review/article page bundle with `{{< pdf >}}` shortcode |
| [`archetypes/default.md`](archetypes/default.md) | `hugo new content <other-path>` | Fallback template for other content sections |

> **Tip:** If you fork this repo, update `authors: ["Erik Larson"]` inside `archetypes/reviews/index.md` and `archetypes/pdf-review/index.md` to your own name. To create a new template type, add `archetypes/<template-name>/index.md` and run `hugo new content --kind <template-name> reviews/<slug>`.

## Adding Movie Reviews

This site includes a built-in Hugo template ([`archetypes/reviews/index.md`](archetypes/reviews/index.md)) so you can scaffold a new movie review page bundle in one command:

```bash
hugo new content reviews/movie-title
```

This creates `content/reviews/movie-title/index.md` pre-filled with your author metadata, date, categories, and review headings:

```yaml
---
title: "Movie Title"
date: 2026-11-25
draft: true
authors: ["Erik Larson"]
description: "Brief one-sentence summary of your review"
tags: ["genre", "director"]
categories: ["reviews"]
series: ["2026 Reviews"]
# Any image in this folder with "featured" in the filename (e.g., featured.png or featured.jpg)
# automatically shows up as the post's card thumbnail and hero image.
---

<!-- Place featured.png in this folder (or update the filename, e.g., featured.jpg) -->
![Movie Title](featured.png)

Opening thoughts and introduction to the film.

## What I Liked

- Point 1
- Point 2

## What Could Be Better

- Point 1

## Final Verdict

Your overall thoughts and rating.
```

To finish and publish the review:

1. **Edit `content/reviews/movie-title/index.md`** with your review, description, and tags
2. **Add a featured image / thumbnail**: drop an image named `featured.png` (or `featured.jpg`, or any filename containing `featured`) into `content/reviews/movie-title/`. Blowfish automatically uses any image with `featured` in the filename as the post's card thumbnail and hero image, and the line `![Movie Title](featured.png)` at the top of the template also displays it at the top of the review (update the filename if you use `.jpg`, or remove the line if you only want it as the thumbnail)
3. **Preview drafts locally** using `hugo server -D --disableFastRender --baseURL http://localhost:1313/`
4. **Set `draft: false`** when you're ready to publish, then commit and push (including the image file)

## Adding PDF Reviews and Documents

You can publish PDF articles, essays, or newspaper clippings that render interactively right inside the browser (on both desktop and mobile) using the `pdf` shortcode and the built-in PDF review template ([`archetypes/pdf-review/index.md`](archetypes/pdf-review/index.md)).

### Step-by-Step (Recommended: Page Bundle)

1. **Create a new PDF review folder** from the template:
   ```bash
   hugo new content --kind pdf-review reviews/article-title
   ```
   This creates `content/reviews/article-title/index.md` with the front matter and `pdf` shortcode already set up.

2. **Copy your PDF into that folder**:
   ```
   content/reviews/article-title/
   ├── index.md
   ├── my-article.pdf
   └── featured.jpg        # Optional card/hero image
   ```

3. **Update `index.md`** to point `src` at your PDF filename and fill in the metadata:
   ```yaml
   ---
   title: "My Published Article"
   date: 2026-11-25
   draft: false
   authors: ["Erik Larson"]
   description: "Originally published in The Hamline Oracle"
   tags: ["film-criticism", "festival"]
   categories: ["reviews"]
   ---

   Optional intro text above the viewer.

   {{< pdf src="my-article.pdf" title="My Published Article" >}}
   ```

4. **Preview locally** (`hugo server --disableFastRender --baseURL http://localhost:1313/`), then commit **both** `index.md` and the `.pdf` file and push to deploy:
   ```bash
   git add content/reviews/article-title/
   git commit -m "Add PDF review: My Published Article"
   git push
   ```

### Shortcode Options

You can also drop the `{{< pdf >}}` shortcode into any existing review or page:

```markdown
<!-- PDF in the same page bundle folder (recommended) -->
{{< pdf src="article.pdf" >}}

<!-- PDF in static/pdfs/ (shared across pages) -->
{{< pdf src="pdfs/article.pdf" title="Festival Coverage" >}}

<!-- With custom height, starting page, and download button hidden -->
{{< pdf src="article.pdf" title="Full Issue" height="600px" page="2" download="false" >}}
```

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `src` | *(required)* | Filename in the page bundle, path under `static/` or `assets/`, or external `https://` URL |
| `title` | PDF filename | Title shown in the viewer toolbar |
| `height` | `750px` | Maximum scrollable height of the viewer |
| `page` | `1` | Page number to open on |
| `download` | `"true"` | Set to `"false"` to hide the download button |

> **Tip:** The viewer supports Prev/Next buttons, typing a page number directly, Left/Right arrow keys when focused, Zoom (`-` / `Fit` / `+`), Open in New Tab, and Download. PDF.js is self-hosted and only loads on pages that include the `{{< pdf >}}` shortcode.

## Adding Content to Archives

The **Archives** section (`content/archives/`, accessible at `/archives/`) holds previously published reviews and articles from other outlets. You can reuse both the normal review archetype and the PDF review archetype for archived posts by targeting `archives/<slug>` and passing `--kind`:

### Normal (Text) Archived Review

```bash
hugo new content --kind reviews archives/article-slug
```

> **Note:** Include `--kind reviews` when creating a normal post under `archives/` so Hugo uses `archetypes/reviews/index.md` instead of falling back to `archetypes/default.md`.

### PDF Archived Review

```bash
hugo new content --kind pdf-review archives/article-slug
```

Then copy your PDF file into `content/archives/article-slug/` and update `src="document.pdf"` in `content/archives/article-slug/index.md`:

```
content/archives/article-slug/
├── index.md
├── my-archived-article.pdf   # For PDF posts
└── featured.jpg              # Optional card/hero image
```

### Publishing Archived Posts

1. **Set the original publication date** in `date:` (e.g., `date: 2024-05-10`) — the Archives page groups entries by year automatically (`groupByYear = true` in `config/_default/params.toml`).
2. **Preview drafts locally**:
   ```bash
   hugo server -D --disableFastRender --baseURL http://localhost:1313/
   ```
   Open `http://localhost:1313/archives/` to check how it renders.
3. **Set `draft: false`** when ready, then commit and push the entire folder (including any `.pdf` or image files):
   ```bash
   git add content/archives/article-slug/
   git commit -m "Add archived review: Article Title"
   git push
   ```

> **Homepage visibility:** Because `mainSections = ["reviews"]` in `config/_default/params.toml`, posts in `content/archives/` appear on the **Archives** page (and in **Tags** / **Authors**) without crowding the homepage **Recent** section. If you ever want archived posts to appear in **Recent** on the homepage too, change it to `mainSections = ["reviews", "archives"]`.

## Adding Images and Movie Posters

Blowfish automatically optimizes local images (generating responsive sizes and click-to-zoom) and handles the GitHub Pages `/erikatthemovies/` URL prefix when images are stored in either the **post's page bundle folder** or **`assets/img/`**.

### Where to Put Images

1. **Images for a single post (recommended)** — put them right inside that post's folder:
   ```
   content/reviews/dune-part-two/
   ├── index.md
   ├── featured.jpg        # Automatically used for the card thumbnail & hero background
   ├── poster.jpg          # Referenced inside index.md
   └── still-01.jpg        # Referenced inside index.md
   ```
   Reference them in `index.md` by filename only:
   ```markdown
   ![Dune: Part Two theatrical poster](poster.jpg)
   ```

2. **Images shared across multiple posts** — put them in `assets/img/` (e.g., `assets/img/festival-logo.png`) and reference them **without a leading slash**:
   ```markdown
   ![Festival logo](img/festival-logo.png)
   ```

> **Important (GitHub Pages subpath):** Avoid storing post images in `static/img/` and referencing them as `/img/...` in Markdown — because the live site is hosted at `/erikatthemovies/`, root-relative `/img/...` paths will 404 on GitHub Pages and skip Blowfish's responsive image optimization. Always use the post's folder or `assets/img/` (`img/...` without a leading slash).

### Card Thumbnails and Hero Images

Any image placed in a post's folder whose filename contains **`featured`** (such as `featured.jpg` or `featured.png`) will automatically show up as the **thumbnail** for that post on the homepage cards, review lists, and hero background (Blowfish also matches `cover` and `thumbnail` in filenames):

1. Save the image inside that post's folder (e.g., `content/reviews/dune-part-two/featured.jpg` or `featured.png`).
2. Blowfish detects it automatically for the post thumbnail and hero — no extra front matter is required.
3. If you also want the image displayed inside the body of the post (as the movie review archetype does with `![Movie Title](featured.png)` at the top), keep that Markdown image line (updating `.png` to `.jpg` if needed). If you only want it as the card thumbnail/hero, simply remove the Markdown image line from the body.

### Captions, Sizing Posters, and Galleries

- **Markdown image with a caption** (text in quotes becomes the `<figcaption>`):
  ```markdown
  ![Dune: Part Two poster](poster.jpg "Theatrical poster for *Dune: Part Two* (2024)")
  ```

- **Blowfish `figure` shortcode** (useful for sizing tall movie posters, centering, adding a link, or disabling click-to-zoom):
  ```markdown
  {{< figure
    src="poster.jpg"
    alt="Dune: Part Two theatrical poster"
    caption="Theatrical release poster (2024)"
    class="w-80 mx-auto"
  >}}
  ```
  Common options: `src`, `alt`, `caption`, `class` (e.g., `w-80 mx-auto` to constrain a tall poster to 320px wide and center it), `href` (make the image clickable), and `nozoom=true` (disable Blowfish's click-to-zoom).

- **Side-by-side movie stills (`gallery` shortcode)**:
  ```markdown
  {{< gallery >}}
    <img src="still-01.jpg" class="grid-w50" alt="Opening desert shot" />
    <img src="still-02.jpg" class="grid-w50" alt="Arrakis skyline" />
  {{< /gallery >}}
  ```

- **Don't forget to commit images** along with your post so GitHub Actions includes them in the build:
  ```bash
  git add content/reviews/dune-part-two/
  git commit -m "Add Dune: Part Two review and poster"
  git push
  ```

## Local Development

### Prerequisites

- Hugo Extended v0.152.2 or later
- Git

### Running the Site Locally

1. Clone your repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd REPO_NAME
   ```

2. Initialize the theme submodule:
   ```bash
   git submodule update --init --recursive
   ```

3. Start the Hugo development server:
   ```bash
   hugo server --disableFastRender --baseURL http://localhost:1313/
   ```

4. Open your browser to `http://localhost:1313/`

**Note**: The `--baseURL` flag is important for local development because the production config points to GitHub Pages.

### Making Changes

1. Edit files as needed
2. Hugo will automatically reload changes in your browser
3. **Important**: If you change SVG files or see unexpected rendering, do a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)

## Deploying to GitHub Pages

Deployment is automatic via GitHub Actions:

1. Make your changes locally
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. GitHub Actions will automatically build and deploy your site
4. Check the "Actions" tab in your repository to monitor deployment

The workflow file is located at `.github/workflows/hugo.yml` and uses Hugo v0.152.2 extended.

## Troubleshooting

### 404 Error on Localhost

**Problem**: Getting 404 errors when running `hugo server`

**Solution**: Make sure to include the `--baseURL` flag:
```bash
hugo server --disableFastRender --baseURL http://localhost:1313/
```

### Author Image Not Showing

**Problem**: Profile picture doesn't appear on the deployed site

**Causes**:
1. Image is hosted externally (not allowed)
2. Image file not committed to git repository

**Solution**:
1. Move your image to `assets/img/yourphoto.jpg`
2. Update config to use local path: `image = "img/yourphoto.jpg"`
3. Add to git: `git add assets/img/yourphoto.jpg`
4. Commit and push

### SVG Background Shows Solid Color

**Problem**: Animated background appears as a solid color instead of the pattern

**Causes**:
1. Browser caching old version
2. Hugo server needs restart

**Solution**:
1. Stop Hugo server (Ctrl+C)
2. Clear the public directory: `rm -rf public`
3. Restart Hugo server
4. Do a hard refresh in browser (Ctrl+Shift+R)

### Multiple Hugo Server Instances

**Problem**: Error about port 1313 already in use

**Solution**: Only run one Hugo server at a time. Check for other terminal windows running Hugo:
```bash
pkill hugo
# Then restart your server
hugo server --disableFastRender --baseURL http://localhost:1313/
```

### Changes Not Appearing on GitHub Pages

**Problem**: Pushed changes but site hasn't updated

**Solution**:
1. Check the "Actions" tab in your GitHub repository
2. Verify the workflow completed successfully
3. Wait a few minutes for GitHub Pages to update
4. Clear your browser cache or use incognito mode

## Technical Details

### Site Structure

```
erikatthemovies/
├── .github/workflows/hugo.yml    # GitHub Actions deployment
├── archetypes/
│   ├── default.md                # Fallback template for other content
│   ├── reviews/index.md          # Template for normal movie reviews
│   └── pdf-review/index.md       # Template for PDF review posts
├── assets/
│   ├── css/
│   │   ├── custom.css            # Custom icon styles
│   │   └── pdf-viewer.css        # PDF viewer styles (loaded conditionally)
│   ├── icons/                    # Custom social/affiliation icons
│   │   ├── letterboxd.svg        # Custom Letterboxd icon
│   │   └── mnfca.png             # Minnesota Film Critics Association icon
│   ├── img/                      # Images for Hugo processing
│   │   └── erik.jpg              # Author photo
│   ├── js/
│   │   └── pdf-viewer.js         # Interactive PDF.js viewer controller
│   └── lib/pdfjs/                # Self-hosted PDF.js library & worker
├── config/_default/              # Hugo configuration
│   ├── hugo.toml                 # Main site config
│   ├── languages.en.toml         # Author info and social links
│   ├── menus.en.toml             # Navigation menus
│   └── params.toml               # Theme parameters
├── content/
│   ├── archives/                 # Previously published / archived reviews
│   └── reviews/                  # Movie review posts
├── layouts/
│   ├── partials/
│   │   ├── extend-head-uncached.html  # Conditional PDF.js loader
│   │   └── icon.html             # SVG + PNG/WebP icon support
│   └── shortcodes/
│       └── pdf.html              # Interactive {{< pdf >}} shortcode
├── static/
│   └── img/
│       └── background.svg        # Animated background
└── themes/blowfish/              # Theme (git submodule)
```

### Key Configuration Files

- `config/_default/hugo.toml` - Site URL, title, and basic settings
- `config/_default/languages.en.toml` - Author information and social links
- `config/_default/params.toml` - Theme options including background image
- `config/_default/menus.en.toml` - Site navigation structure

### Custom Features

1. **Animated SVG Background**: `static/img/background.svg`
   - Diagonal lines with three different animation speeds
   - Easily customizable colors via find/replace
   - Configured in `params.toml` as `defaultBackgroundImage`

2. **Custom Letterboxd Icon**: `assets/icons/letterboxd.svg`
   - Uses official Letterboxd brand colors
   - Automatically recognized by Blowfish theme
   - Icon name must match the social link key in config

3. **Automated Deployment**: `.github/workflows/hugo.yml`
   - Builds site with Hugo v0.152.2 extended
   - Deploys to GitHub Pages automatically on push to main
   - Includes git submodule initialization

### Hugo Version

This site uses **Hugo Extended v0.152.2**. The extended version is required for:
- SCSS/SASS processing in the Blowfish theme
- Advanced image processing features

### Theme Documentation

This site uses the Blowfish theme. For advanced customization, see:
- [Blowfish Documentation](https://blowfish.page/docs/)
- Theme repository: `themes/blowfish/`

## Support

For issues specific to this site setup, check the troubleshooting section above.

For Hugo-related questions, see the [Hugo documentation](https://gohugo.io/documentation/).

For Blowfish theme questions, see the [Blowfish documentation](https://blowfish.page/docs/).

---

Generated with Claude Code
