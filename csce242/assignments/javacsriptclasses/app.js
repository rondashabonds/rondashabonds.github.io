// ----- Painting class -----
class Painting {
  constructor(name, artist, image, framed = false) {
    this.name = name;
    this.artist = artist;
    this.image = image;     // path under /images or full URL
    this.framed = framed;   // boolean
  }

  // Create a DOM section that shows the title and thumbnail
  createSection(onClick) {
    const sec = document.createElement('section');
    sec.className = 'card';
    sec.tabIndex = 0; // focusable for accessibility

    const h3 = document.createElement('h3');
    h3.className = 'title';
    h3.textContent = this.name;

    const wrap = document.createElement('div');
    wrap.className = 'thumb-wrap';

    const img = document.createElement('img');
    img.src = this.image;
    img.alt = `${this.name} by ${this.artist}`;

    wrap.appendChild(img);
    sec.appendChild(h3);
    sec.appendChild(wrap);

    // Click/open modal anywhere on the card (or Enter key)
    const open = () => onClick(this);
    sec.addEventListener('click', open);
    sec.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    return sec;
  }
}

// ----- Demo data -----
// Put your images in /images and keep these filenames or change paths below.
// (Examples match the screenshots' vibe.)
const paintings = [
  new Painting('The Bee', 'RichardsDrawings', 'images/bee.jpg', true),
  new Painting('Dream love kitten', 'CDD20', 'images/kitten.jpg', false),
  new Painting('Flowers and Butterflies', 'ElisaRiva', 'images/flowers.jpg', false),
  new Painting('Forest Animals', 'vector_corp', 'images/forest.jpg', false),
  new Painting('Blue Bird', 'Clker-Free-Vector-Images', 'images/bird.jpg', true),
];

// ----- Render gallery -----
const gallery = document.getElementById('gallery');
const modal = document.getElementById('paintingModal');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalImg = document.getElementById('modalImg');
const frameBox = document.getElementById('frameBox');
const frameNote = document.getElementById('frameNote');
const modalClose = document.getElementById('modalClose');

function openModal(painting) {
  modalTitle.textContent = painting.name;
  modalArtist.textContent = painting.artist;
  modalImg.src = painting.image;
  modalImg.alt = `${painting.name} by ${painting.artist}`;

  // Toggle frame style + note
  frameBox.classList.toggle('framed', painting.framed);
  frameBox.classList.toggle('unframed', !painting.framed);
  frameNote.textContent = painting.framed ? 'Framed' : 'Not framed';

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);
// click outside the modal card to close
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
});

// Build all cards
paintings.forEach(p => {
  gallery.appendChild(p.createSection(openModal));
});
