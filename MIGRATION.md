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

## Local upgrade result

- Runtime: Node.js 24.18.0 LTS
- Generator: Hexo 8.1.2
- Theme: NexT 8.28.0 on the nested theme branch `local/hexo8-upgrade`
- Clean install: `npm ci --registry=https://registry.npmjs.org`
- Build: 74 generated files; content processing completes in about one second
- Route comparison: all 41 legacy HTML routes are retained
- Static validation: no missing local targets or unrendered Hexo tags
- Production dependency audit: 0 known vulnerabilities

The abandoned network-fetching `hexo-tag-blog-card` and vulnerable
`hexo-filter-emoji` packages were replaced by local compatibility scripts.
Existing `{% blogCard %}`, `{% emoji %}`, and `:smile:` source syntax remains
supported without performing network requests during the build.

Run locally with the pinned Node version:

```powershell
npm ci
npm run build
npm run validate
npm run server
```

The preview server is intentionally bound to `127.0.0.1`.

## Known external-service status

- Waline renders correctly with its compatible v2 client, but its remote
  LeanCloud application reports that it is archived. Restore the application
  in LeanCloud before expecting comments or counts to load.
- The Artitalk page loads, but `source/shuoshuo/index.md` contains `SECRET`
  placeholders instead of the original App ID and App Key, so it currently
  shows Artitalk's default example content.
- Album metadata, tabs, lazy loading, and images work after restoring the
  missing jQuery-before-Bootstrap dependency order.
- Wardrobe query and submission interfaces render. No login, submission, ACL
  change, or other external write was performed during local validation.
- The browser-visible Google and LeanCloud client keys must be restricted by
  referrer/origin and service-side permissions before publication.

## Security notes for later publication

- Review and restrict the browser-visible Google API key.
- Review LeanCloud ACLs, class permissions, allowed origins, and client keys.
- Verify the Waline and Artitalk/Workers endpoints and their allowed origins.
- Browser client keys cannot be hidden by GitHub Actions secrets; authorization
  must be enforced by the corresponding service.
