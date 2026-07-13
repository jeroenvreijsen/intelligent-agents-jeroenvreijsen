# Written Works — GitHub Pages portfolio

This is a no-build static website. New `.md` and `.txt` files added to `texts/` appear automatically.

## Publish it

1. Create a public GitHub repository, for example `written-works`.
2. Upload everything in this folder to the repository.
3. In `config.js`, replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME`.
4. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. GitHub will publish the site at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`.

## Publish another text

1. Open the `texts` folder on GitHub.
2. Select **Add file → Upload files**.
3. Upload a `.md` or `.txt` file and commit it. It appears automatically on the site.

Markdown files can begin with optional details:

```md
---
title: My essay title
date: 2026-07-13
category: Essay
description: One sentence shown on the collection page.
---

Your text starts here.
```

To change the introduction and About section, edit `index.html`. To change the visual design, edit `styles.css`.
