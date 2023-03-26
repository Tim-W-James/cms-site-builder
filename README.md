<!--
*** README forked from the Best-README-Template: https://github.com/othneildrew/Best-README-Template
*** Forked by Tim James: https://github.com/Tim-W-James/README-Template
***
*** See the TODO lists for project setup.
*** Find a list of resources for writing markdown, etc. at the end of this file.
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Tim-W-James/cms-site-builder">
    <!-- <img src="public/assets/images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

  <h2 align="center" id="top">Headless CMS Site Builder</h2>

  <p align="center">
    Starter for a basic website builder where content can be defined in a headless CMS
    <br />
<!--     <a href="https://github.com/Tim-W-James/cms-site-builder"><strong>Explore the docs »</strong></a>
    <br />
    <br /> -->
<!--     <a href="https://github.com/Tim-W-James/cms-site-builder">View Demo</a> -->
<!--     ·
    <a href="https://github.com/Tim-W-James/cms-site-builder/issues">Report Bug</a> -->
<!--     ·
    <a href="https://github.com/Tim-W-James/cms-site-builder/issues">Request Feature</a> -->
  </p>
</p>

<!-- PROJECT SHIELDS -->
<!-- Shields: https://shields.io -->
<!-- Icons: https://github.com/simple-icons/simple-icons/blob/develop/slugs.md -->

<br/>
<p align="center">
  <!-- GitHub Actions Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/actions"><img src="https://img.shields.io/github/workflow/status/Tim-W-James/cms-site-builder/CI?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI"></a> -->
  <!-- Last Commit Shield -->
  <a href="https://github.com/Tim-W-James/cms-site-builder/commits/main"><img src="https://img.shields.io/github/last-commit/Tim-W-James/cms-site-builder.svg?style=for-the-badge&logo=git&logoColor=white" alt="Commit"></a>
  <!-- Renovate Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/issues/2"><img src="https://img.shields.io/badge/-Renovate-black.svg?style=for-the-badge&logo=renovatebot&colorB=555" alt="Renovate"></a> -->
  <!-- Release Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/releases"><img src="https://img.shields.io/github/v/release/Tim-W-James/cms-site-builder.svg?include_prereleases&style=for-the-badge" alt="Release"></a> -->
  <!-- Contributors Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/graphs/contributors"><img src="https://img.shields.io/github/contributors/Tim-W-James/cms-site-builder.svg?style=for-the-badge&logo=github&logoColor=white" alt="Contributors"></a> -->
  <!-- Forks Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/network/members"><img src="https://img.shields.io/github/forks/Tim-W-James/cms-site-builder.svg?style=for-the-badge" alt="Forks"></a> -->
  <!-- Stars Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/stargazers"><img src="https://img.shields.io/github/stars/Tim-W-James/cms-site-builder.svg?style=for-the-badge" alt="Stars"></a> -->
  <!-- Issues Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/issues"><img src="https://img.shields.io/github/issues/Tim-W-James/cms-site-builder.svg?style=for-the-badge" alt="Issues"></a> -->
  <!-- License Shield -->
  <!-- <a href="https://github.com/Tim-W-James/cms-site-builder/blob/main/LICENSE.txt"><img src="https://img.shields.io/github/license/Tim-W-James/cms-site-builder.svg?style=for-the-badge" alt="License"></a> -->
  <!-- Linkedin Shield -->
  <!-- <a href="https://linkedin.com/in/timothy-william-james/"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555" alt="Linkedin"></a> -->
</p>
<br/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <!-- <li><a href="#goals">Goals</a></li> -->
        <li><a href="#roadmap">Roadmap</a></li>
        <!-- <li><a href="#features">Features</a></li> -->
        <!-- <li><a href="#built-with">Built With</a></li> -->
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <!-- <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul> -->
    </li>
    <!-- <li>
        <a href="#usage">Usage</a>
        <ul>
          <li><a href="#example-usecases">Example Usecases</a></li>
        </ul>
    </li> -->
    <!-- <li>
        <a href="#development">Development</a>
        <ul>
          <li><a href="#testing">Testing</a></li>
          <li><a href="#code-style">Code Style</a></li>
          <li><a href="#project-structure">Project Structure</a></li>
          <li><a href="#documentation">Documentation</a></li>
        </ul>
    </li> -->
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![cms-site-builder Screen Shot][product-screenshot]](https://github.com/Tim-W-James/cms-site-builder)

- Define content on a headless CMS (Sanity.io):
  - Create pages with rich text editors
  - Add images, embedded PDFs, and files to be served and optimised by Next js
  - Custom navigation and dynamic page routes
  - Preview draft changes in Sanity Studio or at `https://SITE_URL/api/preview`
  - ISR (Incremental Static Regeneration) for published changes, without
    requiring a manual rebuild
- Built with Next js for static site generation and integrations with Sanity
- Unstyled Bootstrap starter that can be customised to display content from the
  CMS as desired

<!-- ### Goals

- Stuff to do -->

### Roadmap

Future plans:

- Additional out-of-the-box content in the CMS:
  - Header with social links
  - Footers
  - Customise the base theme from within the CMS and create a dark theme
- Better type safety for the CMS schemas
- Additional runtime type checking on the frontend for the CMS data. Currently,
  the rich text content (using portable text) has runtime type checking, but
  this needs to be done for other schemas

See the [open issues](https://github.com/Tim-W-James/cms-site-builder/issues)
for a list of proposed features (and known issues).

<!-- ### Features

* -->

<!-- ### Built With

* []() -->

<!-- GETTING STARTED -->

## Getting Started

Adapted from the [NextJS + SanityCMS blog
starter](https://github.com/sanity-io/nextjs-blog-cms-sanity-v3). Refer to the
[README](./SANITY.md) for development/deployment instructions (noting that the schemas are
different).

<!-- LICENSE -->
<!-- https://choosealicense.com -->

## License

Distributed under the MIT License. See [`LICENSE.txt`](./LICENSE.txt) for more information.

<!-- CONTACT -->

## Contact

Email: [tim.jameswork9800@gmail.com](mailto:tim.jameswork9800@gmail.com "tim.jameswork9800@gmail.com")

Project Link: [https://github.com/Tim-W-James/cms-site-builder](https://github.com/Tim-W-James/cms-site-builder)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- Adapted from the [NextJS + SanityCMS blog
  starter](https://github.com/sanity-io/nextjs-blog-cms-sanity-v3)

<a href="#top">↑ Back to Top ↑</a>

<!-- MARKDOWN IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: screenshot.png

<!-- USEFUL LINKS FOR MARKDOWN
* https://github.com/Tim-W-James/blog/blob/master/Markdow-Cheatsheet.md
* https://www.markdownguide.org/basic-syntax
* https://www.webpagefx.com/tools/emoji-cheat-sheet
* https://shields.io
* https://github.com/simple-icons/simple-icons/blob/develop/slugs.md
* https://choosealicense.com
* https://pages.github.com
* https://daneden.github.io/animate.css
* https://connoratherton.com/loaders
* https://kenwheeler.github.io/slick
* https://github.com/cferdinandi/smooth-scroll
* http://leafo.net/sticky-kit
* http://jvectormap.com
* https://fontawesome.com -->
