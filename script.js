const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Lightbox: clicking a gallery/award image shows it centered over a dimmed
// backdrop instead of opening it in a new tab. Ctrl/Cmd/middle-click still
// opens the image in a new tab as usual.
const lightboxLinks = document.querySelectorAll('.award-gallery a, .gallery-item');
if (lightboxLinks.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.hidden = true;
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button><img alt="">';
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('img');

  const openLightbox = (href, alt) => {
    overlayImg.src = href;
    overlayImg.alt = alt || '';
    overlay.hidden = false;
    document.body.classList.add('lightbox-open');
  };
  const closeLightbox = () => {
    overlay.hidden = true;
    overlayImg.src = '';
    document.body.classList.remove('lightbox-open');
  };

  lightboxLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const img = link.querySelector('img');
      openLightbox(link.getAttribute('href'), img ? img.alt : '');
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closeLightbox();
  });
}
