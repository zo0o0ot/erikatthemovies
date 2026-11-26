---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
draft: true
authors: ["Erik Larson"]
description: "Brief one-sentence summary of your review"
tags: ["genre", "director"]
categories: ["reviews"]
series: ["{{ now.Format "2006" }} Reviews"]
# Optional: drop a featured.jpg in this folder to use as the card and hero thumbnail
# featured: "featured.jpg"
---

Opening thoughts and introduction to the film.

## What I Liked

- Point 1
- Point 2

## What Could Be Better

- Point 1

## Final Verdict

Your overall thoughts and rating.
