const drawBtn   = document.getElementById('drawBtn');
const cloudRow  = document.getElementById('cloud-row');
const treeRow   = document.getElementById('tree-row');
const skyTop    = document.getElementById('sky-top');

drawBtn.addEventListener('click', drawScene);

function drawScene(){

  cloudRow.innerHTML = '';
  treeRow.innerHTML  = '';
  skyTop.innerHTML   = '';


  const hour = new Date().getHours();
  const isNight = (hour >= 18 || hour < 6); 
  document.body.classList.toggle('night', isNight);
  document.body.classList.toggle('day', !isNight);


  const orb = document.createElement('div');
  orb.className = isNight ? 'moon' : 'sun';
  skyTop.appendChild(orb);

  
  for (let i = 0; i < 6; i++){
    const c = document.createElement('div');
    c.className = 'cloud';
    cloudRow.appendChild(c);
  }

 
  for (let i = 0; i < 6; i++){
    const t = document.createElement('div');
    t.className = 'tree';

    const canopy = document.createElement('div');
    canopy.className = 'canopy';
    const trunk = document.createElement('div');
    trunk.className = 'trunk';

    t.appendChild(canopy);
    t.appendChild(trunk);
    treeRow.appendChild(t);
  }
}
