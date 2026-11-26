---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
draft: true
authors: ["Erik Larson"]
description: "Brief one-sentence summary of this article or review"
tags: ["review"]
categories: ["reviews"]
series: ["{{ now.Format "2006" }} Reviews"]
# Optional: drop a featured.jpg in this folder to use as the card and hero thumbnail
# featured: "featured.jpg"
---

Optional brief introduction or publication note (e.g., originally published in *The Hamline Oracle*).

<!-- Replace "document.pdf" with your PDF filename in this folder -->
{{ "{{<" }} pdf src="document.pdf" title="{{ replace .File.ContentBaseName "-" " " | title }}" {{ ">}}" }}
