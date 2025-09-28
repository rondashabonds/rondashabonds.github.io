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
