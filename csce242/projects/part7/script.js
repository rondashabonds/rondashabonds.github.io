

(function(){
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('primaryNav');
  if (!btn || !nav) return;

  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav--open');
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav--open', !expanded);
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('focusin', (e) => {
    if (!nav.contains(e.target) && e.target !== btn) close();
  });
})();


async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  
  const url = '/data/projects.json';

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.projects) ? data.projects : [];

    if (!items.length) {
      grid.innerHTML = `<p class="note">No projects found in JSON.</p>`;
      return;
    }

    grid.innerHTML = items.map(p => {
      const img = typeof p.img_name === 'string' ? p.img_name : '';
      const title = p.title ?? 'Untitled';
      const category = p.category ?? 'Other';
      const year = p.year ?? '';
      const blurb = p.blurb ?? '';
      const href = p.href ?? '#project';

      return `
        <article class="card">
          <a href="${href}">
            <div class="card-media">
              <img src="${img}" alt="${title} preview" onerror="this.style.display='none'">
            </div>
            <div class="card-body">
              <h3 class="card-title">${title}</h3>
              <p class="card-meta">${category} · ${year}</p>
              <p class="card-meta" style="opacity:.75; margin-top:6px;">${blurb}</p>
            </div>
          </a>
        </article>
      `;
    }).join('');
  } catch (err) {
    grid.innerHTML = `
      <div class="card" style="padding:16px">
        <strong>Couldn’t load projects.json</strong>
        <p style="margin:6px 0 0; opacity:.75;">${String(err)}</p>
        <p style="margin:6px 0 0; opacity:.75;">Ensure /data/projects.json is served by your GitHub Pages URL.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
