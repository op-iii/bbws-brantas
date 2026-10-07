function renderFAB(href = '/mobile/presensi/checkin.html') {
  const container = document.getElementById('fab-container');
  if (!container) return;

  container.innerHTML = `
    <a href="${href}" class="fab" id="fab" aria-label="Aksi Cepat">
      <i data-lucide="plus"></i>
    </a>
  `;

  if (window.lucide) lucide.createIcons();

  // Sembunyikan FAB saat scroll ke bawah
  let lastScrollY = window.scrollY;
  const fab = document.getElementById('fab');

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 100) {
      fab.classList.add('hidden');
    } else {
      fab.classList.remove('hidden');
    }
    lastScrollY = currentY;
  }, { passive: true });
}
