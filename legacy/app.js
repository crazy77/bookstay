(() => {
  const STORAGE_KEY = 'haemyo.lang';
  const html = document.documentElement;
  const btn = document.getElementById('langToggle');

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'ko' || saved === 'en') {
    html.dataset.lang = saved;
  }

  btn.addEventListener('click', () => {
    const next = html.dataset.lang === 'ko' ? 'en' : 'ko';
    html.dataset.lang = next;
    localStorage.setItem(STORAGE_KEY, next);
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const PIN_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';
  document.querySelectorAll('.place-list [data-place], .food-spot[data-place]').forEach(el => {
    const place = el.dataset.place;
    const link = document.createElement('a');
    link.href = 'https://map.kakao.com/?q=' + encodeURIComponent(place);
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'place-link';
    link.setAttribute('aria-label', place + ' · 카카오맵');
    link.innerHTML = PIN_SVG;
    el.appendChild(link);
  });

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1600);
      } catch (e) {
        // clipboard API failed — leave silent; user can still read the password
      }
    });
  });
})();
