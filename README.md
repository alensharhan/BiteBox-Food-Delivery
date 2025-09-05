<p align="center">
  <img src="assets/logo/BiteBox-logo.png" alt="BiteBox" height="80" />
</p>

<h1 align="center">BiteBox — Food Delivery Website</h1>

<p align="center">
  Modern, responsive, static site for a grocery/food delivery brand.<br/>
  Built with HTML, CSS, and vanilla JavaScript, and deployed via GitHub Pages.
</p>

<p align="center">
  <a href="https://github.com/alensharhan/BiteBox-Food-Delivery/actions/workflows/pages.yml">
    <img src="https://github.com/alensharhan/BiteBox-Food-Delivery/actions/workflows/pages.yml/badge.svg" alt="Deploy status">
  </a>
  &nbsp;
  <a href="https://alensharhan.github.io/BiteBox-Food-Delivery/">
    Live Demo
  </a>
</p>

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Customization](#customization)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview
BiteBox is a single-page marketing site for a food/grocery delivery brand. It includes a hero slider, category highlights, a product grid with an add-to-cart interaction and a slide-in cart panel, testimonials, and a polished footer. The site is optimized for mobile and desktop and can be hosted for free using GitHub Pages.

## Features
- **Responsive layout** with a mobile hamburger menu  
- **Hero slider** with previous/next arrows  
- **Categories** grid (fruits, vegetables, drinks, nuts, spices)  
- **Products** grid with ratings, prices, and **add-to-cart → quantity selector** transition  
- **Cart sidebar** with overlay and total calculation (vanilla JS)  
- **About** section with feature highlights  
- **Testimonials** with customer avatars  
- **Accessible footer** with logo, quick links, contact, and social icons  
- **GitHub Pages** CI/CD via Actions workflow

## Tech Stack
- **HTML5**, **CSS3** (modular CSS files), **JavaScript (ES6)**
- **Font Awesome** (icons via CDN)
- **GitHub Actions** → **GitHub Pages** (static hosting)

## Project Structure

BiteBox-Food-Delivery/
├─ index.html
├─ app.js
├─ styles/
│ ├─ general.css
│ ├─ home-section.css
│ ├─ cart.css
│ ├─ category-section.css
│ ├─ product-section.css
│ ├─ about-section.css
│ ├─ customer-section.css
│ └─ footer-section.css
├─ assets/
│ ├─ favicon/fav-pic.png
│ ├─ logo/BiteBox-logo.png
│ ├─ hero-section/...
│ ├─ categories/...
│ ├─ products/...
│ ├─ customers/...
│ └─ about/about-pic.png
└─ .github/workflows/pages.yml # GitHub Pages deploy workflow



## Getting Started

### 1) Clone
```bash
git clone https://github.com/alensharhan/BiteBox-Food-Delivery.git
cd BiteBox-Food-Delivery
