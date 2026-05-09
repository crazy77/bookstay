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
