(() => {
  const nav = document.getElementById('mainNav');
  const progress = document.getElementById('progressBar');
  const backTop = document.getElementById('backTop');
  const year = document.getElementById('year');
  const themeToggle = document.getElementById('themeToggle');
  year.textContent = new Date().getFullYear();

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 25);
    backTop.classList.toggle('show', y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${h ? (y / h) * 100 : 0}%`;
  };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target, target = Number(el.dataset.target);
      let start = 0; const duration = 1100; const startTime = performance.now();
      const tick = now => {
        const p = Math.min((now-startTime)/duration,1);
        const eased = 1-Math.pow(1-p,3);
        el.textContent = Math.floor(start+(target-start)*eased);
        if(p<1) requestAnimationFrame(tick); else el.textContent = target;
      };
      requestAnimationFrame(tick); counterObserver.unobserve(el);
    });
  }, {threshold:.5});
  counters.forEach(c => counterObserver.observe(c));

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-alt');
    const dark = document.body.classList.contains('light-alt');
    themeToggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    localStorage.setItem('teguh-theme', dark ? 'dark' : 'light');
  });
  if(localStorage.getItem('teguh-theme') === 'dark') { document.body.classList.add('light-alt'); themeToggle.innerHTML='<i class="bi bi-sun"></i>'; }

  document.querySelectorAll('#navMenu .nav-link').forEach(link => link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if(menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));
})();
