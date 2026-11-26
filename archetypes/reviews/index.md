---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
draft: true
authors: ["Erik Larson"]
description: "Brief one-sentence summary of your review"
tags: ["genre", "director"]
categories: ["reviews"]
series: ["{{ now.Format "2006" }} Reviews"]
# Any image in this folder with "featured" in the filename (e.g., featured.png or featured.jpg)
# automatically shows up as the post's card thumbnail and hero image.
---

<!-- Place featured.png in this folder (or update the filename, e.g., featured.jpg) -->
![{{ replace .File.ContentBaseName "-" " " | title }}](featured.png)

Opening thoughts and introduction to the film.

## What I Liked

- Point 1
- Point 2

## What Could Be Better

- Point 1

## Final Verdict

Your overall thoughts and rating.
