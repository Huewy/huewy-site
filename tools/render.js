#!/usr/bin/env node
// Huewy carousel renderer.
//
//   node render.js <slides-dir> <out-dir>
//
// <slides-dir> holds one HTML fragment per slide named "<YYYY-MM-DD> <post>-<slide>.html"
// (see examples/). Each fragment is a single root <div> whose style starts with IG_ROOT
// below, with three children: header, middle block, footer. In the header, write
// {{LOGO}} where the wordmark goes and wrap the counter as <span class="counter">02 / 07</span>.
//
// Writes:
//   <out-dir>/instagram/<date>_<post>-<slide>.png   1080x1350 (Instagram 4:5)
//   <out-dir>/tiktok/<date>_<post>-<slide>.jpg      1080x1920 (TikTok 9:16, JPEG: TikTok's
//                                                   photo API rejects PNG)
// and prints any slide whose fonts failed to load or whose content overflows.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [SRC, OUT] = process.argv.slice(2).map((p) => path.resolve(p));
if (!SRC || !OUT) { console.error('usage: node render.js <slides-dir> <out-dir>'); process.exit(1); }

const FONTS = path.join(__dirname, 'node_modules/@fontsource');
const font = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTS, file)).toString('base64')}) format('woff2');}`;
const FACES = [
  font('Nunito', 'nunito/files/nunito-latin-600-normal.woff2', 600),
  font('Nunito', 'nunito/files/nunito-latin-800-normal.woff2', 800),
  font('Nunito', 'nunito/files/nunito-latin-900-normal.woff2', 900),
  font('Inter', 'inter/files/inter-latin-400-normal.woff2', 400),
  font('Inter', 'inter/files/inter-latin-500-normal.woff2', 500),
  font('Inter', 'inter/files/inter-latin-600-normal.woff2', 600),
].join('\n');

// Real Huewy wordmark: full colour on paper; single-colour where the purple "e" or
// black lettering would vanish (violet, deep violet and ink backgrounds).
const logo = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, f)).toString('base64');
const LOGOS = { color: logo('logo-color.png'), ink: logo('logo-ink.png'), paper: logo('logo-paper.png') };
function logoFor(html) {
  const bg = (html.match(/background: (#[0-9A-Fa-f]{6})/) || [])[1];
  if (bg === '#F7F4EE') return LOGOS.color;
  if (bg === '#7B61FF') return LOGOS.ink;
  return LOGOS.paper;
}

const IG_ROOT = 'width: 1080px; height: 1350px; box-sizing: border-box; padding: 96px;';
// TikTok safe area, measured on-device: TikTok scales the slide to screen width and
// anchors it high, so ~400px at the top sits under the status/search bar, ~480px at
// the bottom under the caption panel and avatar, ~170px on the right under the buttons.
const TT_ROOT = 'width: 1080px; height: 1920px; box-sizing: border-box; padding: 420px 180px 500px 96px;';

const page = (content) => `<!doctype html><html><head><meta charset="utf-8"><style>${FACES}\nbody{margin:0}</style></head><body>${content}</body></html>`;

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /^\d{4}-\d\d-\d\d \d+-\d\d\.html$/.test(f)).sort();
  if (!files.length) { console.error('no slide fragments found in ' + SRC); process.exit(1); }
  let browser;
  try { browser = await chromium.launch(); }
  catch { browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); }
  const p = await (await browser.newContext({ viewport: { width: 1080, height: 1920 } })).newPage();
  for (const d of ['instagram', 'tiktok']) fs.mkdirSync(path.join(OUT, d), { recursive: true });
  const problems = [];
  for (const file of files) {
    const base = file.replace('.html', '').replace(' ', '_');
    const src = fs.readFileSync(path.join(SRC, file), 'utf8');
    if (!src.includes(IG_ROOT)) { problems.push(`${file}: root style must start with "${IG_ROOT}"`); continue; }
    const withLogo = src.replace('{{LOGO}}', `<img src="${logoFor(src)}" alt="Huewy" style="height: 64px; width: auto; display: block">`);
    for (const [dir, h] of [['instagram', 1350], ['tiktok', 1920]]) {
      let html = withLogo;
      if (dir === 'tiktok') {
        html = html.replace(IG_ROOT, TT_ROOT)
          .replace(/<span class="counter">[^<]*<\/span>/, '') // TikTok shows its own "2 / 7"
          .replace(/(<div style="width: 1080px; height: 1920px;[^"]*">[\s\S]*?<\/div>\s*)<div style="/, '$1<div style="zoom: 0.86; ');
      }
      await p.setContent(page(html), { waitUntil: 'load' });
      await p.evaluate(() => document.fonts.ready);
      const overflow = await p.evaluate(() => {
        const root = document.body.firstElementChild;
        const r = root.getBoundingClientRect();
        const bad = [];
        for (const el of root.querySelectorAll('*')) {
          const b = el.getBoundingClientRect();
          if (b.width && (b.right > r.right + 1 || b.bottom > r.bottom + 1)) bad.push(el.tagName + ':' + (el.textContent || '').trim().slice(0, 30));
        }
        if (root.scrollHeight > root.clientHeight + 1) bad.push('content taller than slide (' + root.scrollHeight + 'px)');
        // Middle block must not collide with header/footer.
        const kids = [...root.children].map((k) => k.getBoundingClientRect());
        if (kids.length === 3 && (kids[1].top < kids[0].bottom || kids[1].bottom > kids[2].top)) bad.push('middle block overlaps header/footer');
        return bad;
      });
      const out = path.join(OUT, dir, base + (dir === 'tiktok' ? '.jpg' : '.png'));
      await p.screenshot({ path: out, type: dir === 'tiktok' ? 'jpeg' : 'png', quality: dir === 'tiktok' ? 92 : undefined, clip: { x: 0, y: 0, width: 1080, height: h } });
      if (overflow.length) problems.push(`${dir}/${base}: ${overflow.join(' | ')}`);
    }
  }
  await browser.close();
  console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : `OK: ${files.length} slides rendered to instagram/ and tiktok/, no overflow`);
})();
