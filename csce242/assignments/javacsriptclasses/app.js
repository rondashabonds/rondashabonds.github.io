
class Painting {
  constructor({ name, artist, image, framed = false }) {
    this.name = name;
    this.artist = artist;
    this.image = image;      
    this.framed = framed;    
  }

 
  getSection() {
    const section = document.createElement('article');
    section.className = 'card';
    section.setAttribute('tabindex', '0'); 

    section.innerHTML = `
      <h3>${this.name}</h3>
      <p>by ${this.artist}</p>
      <img class="thumb" src="images/${this.image}" alt="${this.name} by ${this.artist}">
    `;

    
    section.addEventListener('click', () => this.showModal());
    section.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') this.showModal();
    });

    return section;
  }

 
  showModal() {
    const modal = document.getElementById('paintingModal');
    const title = document.getElementById('modalTitle');
    const artist = document.getElementById('modalArtist');
    const img = document.getElementById('modalImg');
    const frameWrap = document.getElementById('modalFrameWrap');
    const framedFlag = document.getElementById('modalFramed');

    title.textContent = this.name;
    artist.textContent = `by ${this.artist}`;
    img.src = `images/${this.image}`;
    img.alt = `${this.name} by ${this.artist}`;

  
    frameWrap.classList.toggle('framed', !!this.framed);
    framedFlag.textContent = this.framed ? 'Framed' : 'Unframed';

    modal.style.display = 'block';
  }
}

const paintings = [
  new Painting({
    name: 'Starry Night',
    artist: 'Vincent van Gogh',
    image: 'starry-night.jpg',
    framed: true
  }),
  new Painting({
    name: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    image: 'mona-lisa.webp',
    framed: false
  }),
  new Painting({
    name: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    image: 'persistence-of-memory.jpg',
    framed: true
  }),
  new Painting({
    name: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    image: 'girl-with-a-pearl-earring.jpg',
    framed: false
  }),
  new Painting({
    name: 'The Scream',
    artist: 'Edvard Munch',
    image: 'the-scream.jpg',
    framed: true
  })
];


const gallery = document.getElementById('gallery');
paintings.forEach(p => gallery.appendChild(p.getSection()));


const modalEl = document.getElementById('paintingModal');
const modalClose = document.getElementById('modalClose');

modalClose.addEventListener('click', () => modalEl.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modalEl) modalEl.style.display = 'none';
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalEl.style.display = 'none';
});
