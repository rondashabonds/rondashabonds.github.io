
const before = {
  "Vintage Ponytail (1960)": "images/barbie1.jpg",
  "Malibu Barbie (1971)":    "images/barbie3.jpg",
  "Totally Hair (1992)":     "images/barbie5.jpg",
   "Holiday Barbie (1998)":   "images/barbie7.jpg",
};


const after = {
  "Vintage Ponytail (1960)": "images/barbie2.jpg",
  "Malibu Barbie (1971)":    "images/barbie4.jpg",
  "Totally Hair (1992)":     "images/barbie6.jpg",
  "Holiday Barbie (1998)":   "images/barbie8.jpg",
};


const gallery    = document.getElementById('gallery');
const popup      = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupImg   = document.getElementById('popupImg');
const closeBtn   = document.getElementById('close');


function makeCard(name, src){
  const card = document.createElement('figure');
  card.className = 'card';
  card.tabIndex = 0;

  const img = document.createElement('img');
  img.src = src;
  img.alt = `${name} (before restoration)`;

  const cap = document.createElement('figcaption');
  cap.className = 'caption';
  cap.textContent = `Please restore ${name}`;

  card.append(img, cap);

  card.addEventListener('click', () => openPopup(name));
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPopup(name); }
  });

  return card;
}

function renderGallery(){
  gallery.innerHTML = '';
  Object.entries(before).forEach(([name, src]) => {
    gallery.appendChild(makeCard(name, src));
  });
}


function openPopup(name){
  popupTitle.textContent = `${name} — After Restoration`;
  popupImg.src = after[name] || '';
  popupImg.alt = `${name} (after restoration)`;
  popup.classList.remove('hidden');
}

function closePopup(){
  popup.classList.add('hidden');
  popupImg.src = '';
  popupImg.alt = '';
}


popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });

closeBtn.addEventListener('click', closePopup);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !popup.classList.contains('hidden')) closePopup();
});


renderGallery();
