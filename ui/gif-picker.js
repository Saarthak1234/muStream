let savedGifs = JSON.parse(localStorage.getItem('savedCustomGifs')) || [];

function renderGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  
  if (savedGifs.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.5); font-size: 13px; padding: 20px;">No saved GIFs found. Add some from the Settings menu!</div>';
    return;
  }
  
  savedGifs.forEach((gif, i) => {
    // Check if it's the active GIF
    let isActive = false;
    try {
      const settings = JSON.parse(localStorage.getItem('customGifSettings'));
      if (settings && settings.url === gif.url) isActive = true;
    } catch(e) {}

    const card = document.createElement('div');
    card.className = `gif-card ${isActive ? 'active' : ''}`;
    card.innerHTML = `
      <div class="gif-preview" style="position: relative; line-height: 0; background-color: #111;">
        <img src="${gif.url}" style="width: 100%; height: auto; display: block;" />
        <div class="gif-select-box" style="position: absolute; top: 6px; left: 6px; width: 14px; height: 14px; border-radius: 3px; border: 2px solid ${isActive ? '#4ade80' : 'rgba(255,255,255,0.4)'}; background: ${isActive ? '#4ade80' : 'rgba(0,0,0,0.5)'}; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 2;">
          ${isActive ? '<svg viewBox="0 0 24 24" width="10" height="10" fill="#000"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' : ''}
        </div>
      </div>
      <div class="gif-info" style="padding: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
        <span style="font-weight: 500; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${gif.name}</span>
        <button class="icon-btn delete-btn" style="color: #e06c75; font-size: 10px; padding: 2px; border: none; background: transparent; cursor: pointer;">✕</button>
      </div>
    `;
    
    card.onclick = () => {
      window.api.selectGif(gif.url, gif.name);
      document.body.classList.add('closing');
      setTimeout(() => window.close(), 140);
    };
    
    grid.appendChild(card);
  });
}

document.getElementById('closeBtn').addEventListener('click', () => {
  document.body.classList.add('closing');
  setTimeout(() => window.close(), 140);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.body.classList.add('closing');
    setTimeout(() => window.close(), 140);
  }
});

renderGrid();
