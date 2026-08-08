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
- The 385+ MB source album is stored outside the repository at
  `../private/photos-source/`; published album metadata remains under
  `source/album/`.

The customized theme is kept as a nested local Git repository during local
validation. Its legacy customizations are committed on the theme's
`local/legacy-baseline` branch before upgrade work begins.

## Publishing gate

Do not create a remote repository, push commits, or configure GitHub Pages
until the locally upgraded site has been reviewed and explicitly approved.

## Local upgrade result

- Runtime: Node.js 24.14.0 LTS
- Generator: Hexo 8.1.2
- Theme: NexT 8.28.0 on the nested theme branch `local/hexo8-upgrade`
- Clean install: `npm ci --registry=https://registry.npmjs.org`
- Build: 81 generated files; content processing completes in about one second
- Route comparison: 40 legacy HTML routes are retained; the obsolete LeanCloud
  `/tools/submit/` page is intentionally replaced by authenticated
  `/admin/nikki/` management.
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

- LeanCloud has announced that all public services, including its console and
  APIs, will shut down on 2027-01-12. Full exports of the `waline`, `shuoshuo`,
  and `nikkisearch` applications are required before replacing their storage
  backends; JSONL exports are sufficient for the planned conversion because
  BSON backup export is unavailable for these archived applications.
- JSONL exports are stored outside every repository under
  `../private/leancloud-exports/`. The export inventory is: Waline
  `Comment` 6 and `Users` 1; Artitalk `shuoshuo` 10, `atComment` 2 and
  `_User` 1; Nikki `wardrobe1` 19,381, `categoriesAmount` 34,
  `colorsAmount` 14 and `_User` 1. The exported `_File` classes contain no
  records, so there are no LeanCloud file objects to download for these apps.
- Waline now uses the independently deployed service at
  `https://blog-comment-alpha.vercel.app/` with Supabase PostgreSQL storage.
  Six legacy comments were imported and verified; the old LeanCloud app is no
  longer required for live comments.
- The Artitalk replacement is developed as the independent Momentide project
  under `../projects/momentide/`. Version 0.1.0 is vendored under
  `source/vendor/momentide/0.1.0/`; `/shuoshuo/` points to the local backend
  and Cloudflare's public test site key until production acceptance.
- The independently implemented shared API lives at `../projects/blog-api/`.
- The production API is deployed at `https://blog-api-mu-drab.vercel.app`;
  local previews now exercise this endpoint with exact-origin CORS.
  Its unit and HTTP-boundary tests pass. The isolated `momentide_*` schema was
  applied to Supabase PostgreSQL and the LeanCloud conversion imported 10
  talks and 2 comments with zero orphan relationships and zero raw email
  values. One new administrator was created, password/session behavior was
  verified, RLS and revoked direct client privileges were checked, and setup
  was permanently locked. Before/after row hashes confirmed that all `wl_*`
  data remained unchanged. Local credentials remain only in the ignored
  `.env.local`; its temporary plaintext administrator password was removed
  immediately after verification.
- Album metadata, tabs, lazy loading, and images work after restoring the
  missing jQuery-before-Bootstrap dependency order.
- The Nikki export was converted and imported into the same PostgreSQL project:
  19,381 items, 19,381 unique legacy IDs, 261 taxonomy values and 6 preserved
  legacy anomalies. The migration is idempotent and before/after fingerprints
  confirmed that Waline and Momentide rows did not change.
- Wardrobe public search, random recommendations and live category/color
  statistics now use Blog API. The old LeanCloud submission page was removed
  and `/admin/nikki/` provides shared-authenticated add/edit/hide/restore tools.
  Browser tests cover desktop/dark/mobile public views and the logged-out admin
  boundary. The explicitly approved controlled write test verified create,
  update, hide, restore and audit history; afterward the temporary item,
  taxonomy, revisions and session were all zero and the identity sequence was
  restored.
- The Nikki LeanCloud App ID/Key and SDK were removed from generated pages. The
  browser-visible Google key must still be restricted before publication.

## Security notes for later publication

- Review and restrict the browser-visible Google API key.
- Verify the Waline and Momentide endpoints and their allowed origins.
- Browser client keys cannot be hidden by GitHub Actions secrets; authorization
  must be enforced by the corresponding service.
