function renderHeader(options = {}) {
  const container = document.getElementById('header-container');
  if (!container) return;

  container.innerHTML = `
    <header class="header">
      <button class="header-btn" id="btn-menu" aria-label="Menu">
        <i data-lucide="menu"></i>
      </button>
      <div class="header-title">
        <span class="header-greeting">${options.greeting || 'Selamat Pagi'}</span>
        <span class="header-name">${options.nama || 'Pegawai'}</span>
      </div>
      <button class="header-btn" id="btn-notif" aria-label="Notifikasi">
        <i data-lucide="bell"></i>
      </button>
    </header>
  `;

  if (window.lucide) lucide.createIcons();
}
