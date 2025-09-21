
const smMenu = document.getElementById('smMenu');
const menuBtn = document.getElementById('menuBtn');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const expanded = smMenu.getAttribute('aria-expanded') === 'true';
    smMenu.setAttribute('aria-expanded', String(!expanded));
    menuBtn.setAttribute('aria-expanded', String(!expanded));
  });
}


function showSection(selector) {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hide'));
  document.querySelector(selector).classList.remove('hide');

  if (smMenu) smMenu.setAttribute('aria-expanded', 'false');
}
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const sel = el.getAttribute('data-target');
    showSection(sel);
  });
});


const days = document.getElementById('days');
const daysMsg = document.getElementById('daysMsg');
const careMsg = document.getElementById('careMsg');
const plantPic = document.getElementById('plantPic');

function svgHealthy() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle class="sun" cx="86" cy="30" r="7"/>
    <rect class="pot" x="44" y="80" width="32" height="6" rx="2"/>
    <path class="stem" d="M60 80 C60 60 60 60 60 40"/>
    <path class="leaf" d="M60 40 C50 48 42 48 36 44 C44 36 52 34 60 40Z"/>
    <path class="leaf" d="M60 46 C70 54 78 54 84 50 C76 42 68 40 60 46Z"/>
  </svg>`;
}

function svgNeedsWater() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="stem" d="M60 84 C60 60 60 60 60 44"/>
    <path class="leaf" d="M60 48 C50 54 44 56 36 54 C43 46 52 44 60 48Z"/>
    <path class="leaf" d="M60 54 C69 60 76 62 84 60 C77 52 68 50 60 54Z"/>
    <path class="water" d="M50 28 q6 -10 12 0 q-6 4 -12 0Z"/>
    <path class="water" d="M70 28 q6 -10 12 0 q-6 4 -12 0Z"/>
    <path class="water" d="M60 20 q6 -10 12 0 q-6 4 -12 0Z"/>
  </svg>`;
}

function svgDrooping() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect class="pot-dry" x="44" y="84" width="32" height="6" rx="2"/>
    <path class="stem-dry" d="M60 84 C58 66 55 58 50 50"/>
    <path class="leaf-dry" d="M50 50 C46 60 40 64 34 64 C36 54 42 48 50 50Z"/>
    <path class="petal" d="M78 52 q8 -12 16 0 q-8 6 -16 0Z"/>
    <circle class="petal" cx="92" cy="64" r="3"/>
  </svg>`;
}

function svgDead() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect class="pot-dead" x="44" y="86" width="32" height="6" rx="2"/>
    <path class="stem-dead" d="M60 86 C58 72 54 66 48 60"/>
    <path class="stem-dead" d="M60 86 C62 72 66 66 72 60"/>
    <path class="leaf-dead" d="M44 62 q6 6 0 12 q-10 -2 -12 -8 q6 -6 12 -4Z"/>
    <path class="leaf-dead" d="M76 62 q-6 6 0 12 q10 -2 12 -8 q-6 -6 -12 -4Z"/>
  </svg>`;
}

function updatePlant() {
  const v = Number(days.value);
  daysMsg.textContent = `It's been ${v} day${v===1?'':'s'} since watering your plant`;

  if (v >= 1 && v <= 2) {
    careMsg.textContent = 'Your plant is healthy and happy';
    plantPic.innerHTML = svgHealthy();
  } else if (v >= 3 && v <= 5) {
    careMsg.textContent = 'Your plant needs watering';
    plantPic.innerHTML = svgNeedsWater();
  } else if (v >= 6 && v <= 9) {
    careMsg.textContent = 'Leaves are dropping, the color is changing — water soon';
    plantPic.innerHTML = svgDrooping();
  } else { 
    careMsg.textContent = 'Sorry, your plant is no longer with us';
    plantPic.innerHTML = svgDead();
  }
}
if (days) {
  days.addEventListener('input', updatePlant);
  updatePlant();
}


const timeNow = document.getElementById('timeNow');

function fmt(t) {
  let h = t.getHours(), m = t.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12; if (h === 0) h = 12;
  const mm = String(m).padStart(2,'0');
  return `${h}:${mm} ${ampm}`;
}
function setClock() {
  const now = new Date();
  if (timeNow) timeNow.textContent = fmt(now);
  const msToNext = (60 - now.getSeconds()) * 1000 + 5;
  setTimeout(setClock, msToNext);
}
setClock();
