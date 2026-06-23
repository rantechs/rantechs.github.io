// Regenerate the Featured/Selected project cards in index.html from data/projects.yml.
// Idempotent: run `npm run gen`. Replaces content between the PROJECTS:START/END markers.
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const DATA = 'data/projects.yml';
const TARGET = 'index.html';
const STATUS_DOT = { Production: '●', 'In Development': '◐', Maintained: '●', Archived: '○' };

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function card(p) {
  const stack = (p.stack || [])
    .map((s) => `<span class="badge stack">${esc(s)}</span>`)
    .join('\n            ');
  const repoLabel = p.repo_public ? 'Repo · Source' : '🔒 Repo · Private';
  const repoTitle = p.repo_public
    ? 'Source repository'
    : 'Private repository — accessible to the RanTechs team';

  const actions = [];
  if (p.case_study)
    actions.push(`<a class="btn primary" href="${p.case_study}">Case study →</a>`);
  if (p.production)
    actions.push(
      `<a class="btn ghost" href="${p.production}" target="_blank" rel="noopener">Live · ${esc(p.hosting || 'Web')} ↗</a>`
    );
  if (p.repo)
    actions.push(
      `<a class="btn ghost" href="https://github.com/${p.repo}" target="_blank" rel="noopener" title="${esc(repoTitle)}">${repoLabel}</a>`
    );

  return `      <!-- PROJECT: ${p.slug} -->
      <article class="pcard">
        <div>
          <div class="meta-cat">${esc(p.category)}</div>
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.summary || p.tagline)}</p>
          <div class="badges">
            ${stack}
            <span class="badge status">${STATUS_DOT[p.status] || '●'} ${esc(p.status)}</span>
          </div>
        </div>
        <div class="actions">
          ${actions.join('\n          ')}
        </div>
      </article>`;
}

const { projects = [] } = yaml.load(readFileSync(DATA, 'utf8')) || {};
const cards = projects.map(card).join('\n\n');

const html = readFileSync(TARGET, 'utf8');
const re = /(<!-- PROJECTS:START[^>]*-->)[\s\S]*?(<!-- PROJECTS:END -->)/;
if (!re.test(html)) {
  console.error('PROJECTS markers not found in', TARGET);
  process.exit(1);
}
const out = html.replace(re, `$1\n${cards}\n      $2`);
writeFileSync(TARGET, out);
console.log(`gen-cards: wrote ${projects.length} card(s) to ${TARGET}`);
