// ===================
// Presensi - Logic dasar (prototype)
// ===================

document.addEventListener('DOMContentLoaded', () => {
  initCamera();
  updateJam();
  setInterval(updateJam, 1000);
  initModeSelector();
  initButtons();
  updateTombolWarna();
});

// ====== Kamera ======
async function initCamera() {
  const video = document.getElementById('video');
  if (!video) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } },
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    console.error('Kamera error:', err);
    const status = document.getElementById('camera-status');
    status.className = 'camera-status bad';
    status.innerHTML = '<i data-lucide="camera-off"></i><span>Kamera tidak tersedia</span>';
    if (window.lucide) lucide.createIcons();
  }
}

// ====== Jam & Status ======
function updateJam() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const el = document.getElementById('jam-sekarang');
  if (el) el.textContent = `${hh}:${mm}:${ss} WIB`;

  updateStatusMasuk(now);
  updateTombolWarna(now);
}

function updateStatusMasuk(now) {
  const el = document.getElementById('status-masuk');
  if (!el) return;

  const jam = now.getHours() + now.getMinutes() / 60;

  if (jam < 5.5) {
    el.textContent = 'Belum waktunya presensi';
    el.style.color = 'var(--text-secondary)';
  } else if (jam < 7.5) {
    el.textContent = 'Lebih awal';
    el.style.color = 'var(--pupr-blue)';
  } else if (jam < 8) {
    el.textContent = 'Tepat waktu';
    el.style.color = 'var(--success)';
  } else {
    el.textContent = 'Terlambat';
    el.style.color = 'var(--danger)';
  }
}

// ====== Warna Tombol ======
function updateTombolWarna(now = new Date()) {
  const btn = document.getElementById('btn-checkin');
  if (!btn) return;

  const jam = now.getHours() + now.getMinutes() / 60;

  btn.classList.remove('btn-warning', 'btn-danger');

  if (jam < 7.5) {
    // default biru
  } else if (jam < 8) {
    btn.classList.add('btn-warning'); // kuning
  } else {
    btn.classList.add('btn-danger'); // merah
  }
}

// ====== Mode Selector ======
function initModeSelector() {
  const options = document.querySelectorAll('.mode-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
}

// ====== Tombol Aksi ======
function initButtons() {
  const btnCheckin = document.getElementById('btn-checkin');
  const btnUlangi = document.getElementById('btn-ulangi');

  if (btnCheckin) {
    btnCheckin.addEventListener('click', () => {
      const mode = document.querySelector('.mode-option.active')?.dataset.mode || 'normal';
      alert(`Check-in berhasil (prototype)\nMode: ${mode}`);
      // Di implementasi nyata:
      // 1. Ambil foto dari video
      // 2. Deteksi wajah & blur
      // 3. Ambil koordinat GPS
      // 4. Upload ke GDrive
      // 5. Simpan ke Supabase
    });
  }

  if (btnUlangi) {
    btnUlangi.addEventListener('click', () => {
      initCamera();
    });
  }
}
