# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for ZeroSequels, an AI-powered digital creator consultancy. The site is built as a static HTML/CSS/JavaScript website with no build process or package manager. It showcases the business, developer background, and projects including a Steam game called "MK-ULTRA Psychic Defense".

## Architecture

**Frontend Stack:**
- Pure HTML/CSS/JavaScript (no frameworks)
- Three.js for WebGL shader effects
- Custom CSS with responsive design
- Hosted via GitHub Pages (CNAME file present)

**Key Components:**
- `index.html` - Main landing page with hero section, about, developer info, and projects
- Individual project pages (`mkultra.html`, `polybius.html`, `haikunews7.html`) 
- `styles.css` - Comprehensive styling with scroll-snap sections and responsive design
- WebGL shaders (`heroShader.frag`, `passthrough.vert`) for animated backgrounds
- Image assets for projects and backgrounds

**Background System:**
The site uses a sophisticated dual-layer background system that can switch between:
1. Static image backgrounds with smooth transitions between sections
2. WebGL shader-based animated backgrounds (disabled by default, controlled via `USE_SHADER_BACKGROUND` flag)

**Visual Design:**
- Dark cyberpunk aesthetic with neon blue accents (#4DFFFF)
- Scroll-snap navigation between full-height sections
- Responsive grid layout for projects
- Smooth transitions and hover effects throughout

## Development Notes

**No Build Process:** This is a static site with no compilation, bundling, or package management. Changes can be made directly to HTML/CSS/JS files and viewed in browser.

**Testing:** Open `index.html` in a browser to test locally. The site uses CDN resources (Three.js, Google Fonts) so an internet connection is required.

**Shader Development:** To test WebGL shader effects, change `USE_SHADER_BACKGROUND = true` in the JavaScript section of `index.html`. The current shader creates a retro-futuristic grid animation.

**Content Structure:** Each project has both a summary card on the main page and a dedicated detail page. Project images should be optimized for web and placed in the root directory.

**Deployment:** The site is configured for GitHub Pages deployment with a CNAME file for custom domain hosting.