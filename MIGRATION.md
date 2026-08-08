# Hexo migration record

This repository is being restored locally before any remote repository or
GitHub Pages deployment is created.

## Legacy baseline

- Site generator: Hexo 5.4.0 (`package.json` allowed `^5.0.0`)
- Theme: NexT 8.7.0
- Theme upstream commit: `361c7e16c624a3c0c32f2c9b57a2a13e5746a3c3`
- Legacy lockfile: npm lockfile version 1
- Original site URL: `https://happyseashell.gitee.io/`
- Permalink: `:year/:month/:day/:title/`
- `photos/` is a 385+ MB local source archive and is intentionally ignored;
  the published album metadata remains under `source/album/`.

The customized theme is kept as a nested local Git repository during local
validation. Its legacy customizations are committed on the theme's
`local/legacy-baseline` branch before upgrade work begins.

## Publishing gate

Do not create a remote repository, push commits, or configure GitHub Pages
until the locally upgraded site has been reviewed and explicitly approved.

## Security notes for later publication

- Review and restrict the browser-visible Google API key.
- Review LeanCloud ACLs, class permissions, allowed origins, and client keys.
- Verify the Waline and Artitalk/Workers endpoints and their allowed origins.
- Browser client keys cannot be hidden by GitHub Actions secrets; authorization
  must be enforced by the corresponding service.
