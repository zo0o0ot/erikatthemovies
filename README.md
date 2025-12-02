# Erik at the Movies

A movie review portfolio site built with Hugo and the Blowfish theme, featuring an animated background and custom social media icons.

Live site: https://zo0o0ot.github.io/erikatthemovies/

## Table of Contents

- [Quick Start for Forking](#quick-start-for-forking)
- [Customizing Your Site](#customizing-your-site)
- [Adding Movie Reviews](#adding-movie-reviews)
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

If you need a social media icon not included in the Blowfish theme:

1. Create an SVG file named after the platform (e.g., `letterboxd.svg`)
2. Save it in `assets/icons/`
3. The icon will automatically be available for use in your author links

See `assets/icons/letterboxd.svg` for an example.

## Adding Movie Reviews

Create new review files in the `content/reviews/` directory:

```bash
hugo new content/reviews/movie-title.md
```

Edit the front matter of the new file:

```yaml
---
title: "Movie Title (Year)"
date: 2024-01-15
draft: false
description: "Brief description of your review"
tags: ["genre", "director", "actor"]
---

Your review content goes here. You can use markdown formatting.

## What I Liked

- Point 1
- Point 2

## What Could Be Better

- Point 1

## Final Verdict

Your overall thoughts and rating.
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
├── assets/
│   ├── icons/                    # Custom social media icons
│   │   └── letterboxd.svg       # Custom Letterboxd icon
│   └── img/                      # Images for Hugo processing
│       └── erik.jpg              # Author photo
├── config/_default/              # Hugo configuration
│   ├── hugo.toml                # Main site config
│   ├── languages.en.toml        # Author info and language settings
│   ├── menus.en.toml            # Navigation menus
│   └── params.toml              # Theme parameters
├── content/
│   └── reviews/                  # Movie review posts
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
