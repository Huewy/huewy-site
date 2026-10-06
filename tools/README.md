# Huewy carousel toolkit

Used by the weekly content task (and by hand) to render carousels in Huewy's brand.

```
cd tools
npm install            # fonts + playwright (Chromium is preinstalled; don't run "playwright install")
node render.js <slides-dir> <out-dir>
```

- **Write slides as HTML fragments** in `<slides-dir>`, named `<YYYY-MM-DD> <post>-<slide>.html`.
  Copy the structure of `examples/`: one root `<div>` (style starts with the 1080×1350 root
  style), then header (`{{LOGO}}` + `<span class="counter">02 / 07</span>`), middle block, footer.
- **Output:** `instagram/*.png` (1080×1350) and `tiktok/*.jpg` (1080×1920, TikTok-safe layout,
  JPEG because TikTok's photo API rejects PNG). The script reports any overflow; fix and re-run
  until it prints `OK`.
- **Publish** by copying the output to `social/<ISO week>/instagram|tiktok/` on this branch and
  pushing. Use commit-pinned raw URLs (`raw.githubusercontent.com/Huewy/huewy-site/<sha>/…`)
  in Metricool so cached old versions are never served.

Brand: violet `#7B61FF`, deep violet `#4A31C7`, paper `#F7F4EE`, ink `#14121F`, muted `#5E5A6B`,
divider `#E4DFD3`; Nunito 800/900 headlines, Inter 400–600 body. Amber `#EF9F27` / green
`#639922` only for case-strength chips.
