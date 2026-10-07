function renderBottomMenu(active = 'home') {
  const container = document.getElementById('bottom-menu-container');
  if (!container) return;

  const items = [
    { id: 'home',    icon: 'home',    label: 'Home',    href: '/mobile/index.html' },
    { id: 'presensi',icon: 'clock',   label: 'Presensi',href: '/mobile/presensi/checkin.html' },
    { id: 'laporan', icon: 'file-text',label: 'Laporan',href: '/mobile/laporan/agenda-harian.html' },
    { id: 'profil',  icon: 'user',    label: 'Profil',  href: '/mobile/profil/index.html' }
  ];

  container.innerHTML = `
    <nav class="bottom-pill" id="bottom-pill">
      ${items.map(item => `
        <a href="${item.href}" class="pill-item ${active === item.id ? 'active' : ''}" aria-label="${item.label}">
          <i data-lucide="${item.icon}"></i>
        </a>
      `).join('')}
    </nav>
  `;

  if (window.lucide) lucide.createIcons();

  // Auto-hide saat scroll
  let lastScrollY = window.scrollY;
  const pill = document.getElementById('bottom-pill');

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 100) {
      pill.classList.add('hidden');
    } else {
      pill.classList.remove('hidden');
    }
    lastScrollY = currentY;
  }, { passive: true });
}
