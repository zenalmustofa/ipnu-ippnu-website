/**
 * ============================================================
 * IPNU IPPNU PAC Padangan — Frontend App
 * File  : frontend/js/app.js
 *
 * Bertanggung jawab hanya untuk:
 * - Render tampilan (DOM manipulation)
 * - Menangani event user
 * - Memanggil fungsi dari backend/api.js
 * ============================================================
 */

/* ── STATE ─────────────────────────────────────────────────── */
let isAdmin = false;

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await renderArtikel();
  await renderFoto();
  observeFadeIn();
  initNavScroll();
  initModalClose();
});

/* ── RENDER ARTIKEL ────────────────────────────────────────── */
async function renderArtikel() {
  const grid = document.getElementById('artikelGrid');
  const data  = await apiGetArtikel();

  grid.innerHTML = data.map(a => {
    // Gunakan foto jika tersedia, fallback ke emoji + gradient
    const imgContent = a.foto
      ? `<img src="${a.foto}" alt="${a.judul}" loading="lazy">`
      : `<span class="emoji">${a.emoji || '📰'}</span>`;

    return `
      <div class="artikel-card fade-in" onclick="bukaArtikel(${a.id})">
        <div class="artikel-card-img ${a.foto ? '' : (a.grad || 'g1')}">
          ${imgContent}
          <span class="date-chip">${a.tanggal}</span>
        </div>
        <div class="artikel-card-body">
          <div class="artikel-card-cat">${a.kategori}</div>
          <div class="artikel-card-title">${a.judul}</div>
          <div class="artikel-card-excerpt">${a.isi}</div>
          <div class="artikel-card-footer">
            <div class="artikel-author">
              <div class="author-avatar">${a.penulis.charAt(0)}</div>
              <span class="author-name">${a.penulis}</span>
            </div>
            <span class="read-more">Baca →</span>
          </div>
        </div>
      </div>`;
  }).join('');

  observeFadeIn();
}

/* ── RENDER FOTO DOKUMENTASI ────────────────────────────────── */
async function renderFoto() {
  const grid = document.getElementById('fotoGrid');
  const data  = await apiGetFoto();

  grid.innerHTML = data.map(f => {
    const imgContent = f.src
      ? `<img src="${f.src}" alt="${f.judul}" loading="lazy">`
      : `<span class="emoji-placeholder">${f.emoji}</span>`;

    return `
      <div class="foto-card fade-in">
        <div class="foto-card-img ${f.src ? '' : f.grad}">
          ${imgContent}
        </div>
        <div class="foto-card-body">
          <div class="foto-card-title">${f.judul}</div>
          <div class="foto-card-date">📅 ${f.tanggal}</div>
        </div>
      </div>`;
  }).join('');

  observeFadeIn();
}

/* ── BUKA ARTIKEL (MODAL READ) ──────────────────────────────── */
async function bukaArtikel(id) {
  const data = await apiGetArtikel();
  const a = data.find(x => x.id === id);
  if (!a) return;

  // Cover foto atau fallback
  const coverEl = document.getElementById('readCover');
  if (a.foto) {
    coverEl.innerHTML = `<img src="${a.foto}" alt="${a.judul}">`;
    coverEl.className = 'modal-cover';
  } else {
    coverEl.innerHTML = `<span class="emoji">${a.emoji || '📰'}</span>`;
    coverEl.className = `modal-cover ${a.grad || 'g1'}`;
  }

  document.getElementById('readCat').textContent     = a.kategori;
  document.getElementById('readJudul').textContent   = a.judul;
  document.getElementById('readPenulis').textContent = '✍️ ' + a.penulis;
  document.getElementById('readTanggal').textContent = '📅 ' + a.tanggal;
  document.getElementById('readIsi').innerHTML       = '<p>' + a.isi.replace(/\n/g, '</p><p>') + '</p>';
  bukaModal('readArtikelModal');
}

/* ── LOGIN ──────────────────────────────────────────────────── */
function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();

  if (apiLogin(u, p)) {
    isAdmin = true;
    tutupModal('loginModal');

    const btn = document.querySelector('.nav-btn');
    btn.textContent = '👤 Admin';
    btn.style.background = 'linear-gradient(135deg,var(--green),var(--sky))';

    document.getElementById('adminArtikelBar').style.display = 'flex';
    document.getElementById('adminDokuBar').style.display    = 'block';
    showToast('✅ Selamat datang, Admin!');
  } else {
    showToast('❌ Username atau password salah!');
  }
}

/* ── SUBMIT ARTIKEL ─────────────────────────────────────────── */
async function submitArtikel() {
  const judul    = document.getElementById('artJudul').value.trim();
  const isi      = document.getElementById('artIsi').value.trim();
  const kategori = document.getElementById('artKategori').value;
  const penulis  = document.getElementById('artPenulis').value.trim();
  const fotoSrc  = document.getElementById('artFotoPreviewImg').src || '';
  // Simpan base64 atau URL dari preview
  const foto = document.getElementById('artFotoPreviewImg').dataset.src || '';

  const result = await apiTambahArtikel({ judul, isi, kategori, penulis, foto });

  if (!result.ok) {
    showToast('⚠️ ' + result.pesan);
    return;
  }

  await renderArtikel();
  tutupModal('artikelModal');

  // Reset form
  document.getElementById('artJudul').value   = '';
  document.getElementById('artIsi').value     = '';
  document.getElementById('artPenulis').value = '';
  resetArtFotoPreview();

  showToast('✅ ' + result.pesan);
  document.getElementById('artikel').scrollIntoView({ behavior: 'smooth' });
}

/* ── PREVIEW FOTO ARTIKEL ───────────────────────────────────── */
function previewArtFoto(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('artFotoPreviewImg');
    img.src = e.target.result;
    img.dataset.src = e.target.result;   // simpan base64
    img.style.display = 'block';
    document.getElementById('artFotoPlaceholder').style.display = 'none';
    document.getElementById('artFotoName').textContent = '📎 ' + file.name;
  };
  reader.readAsDataURL(file);
}

function resetArtFotoPreview() {
  const img = document.getElementById('artFotoPreviewImg');
  img.src = '';
  img.dataset.src = '';
  img.style.display = 'none';
  document.getElementById('artFotoPlaceholder').style.display = 'block';
  document.getElementById('artFotoName').textContent = '';
  document.getElementById('artFotoFile').value = '';
}

/* ── PREVIEW & SUBMIT FOTO DOKUMENTASI ─────────────────────── */
function previewFoto(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  document.getElementById('fotoPreviewName').textContent = '📎 ' + file.name;

  const reader = new FileReader();
  reader.onload = e => {
    // Simpan base64 untuk dipakai saat submit
    document.getElementById('fotoFile').dataset.base64 = e.target.result;
  };
  reader.readAsDataURL(file);
}

function submitFoto() {
  const judul = document.getElementById('fotoJudul').value.trim();
  const tgl   = document.getElementById('fotoTanggal').value;
  const src   = document.getElementById('fotoFile').dataset.base64 || '';

  apiTambahFoto({ judul, tanggal: tgl, src }).then(result => {
    if (!result.ok) {
      showToast('⚠️ ' + result.pesan);
      return;
    }

    renderFoto();
    tutupModal('uploadFotoModal');

    // Reset form
    document.getElementById('fotoJudul').value          = '';
    document.getElementById('fotoTanggal').value        = '';
    document.getElementById('fotoPreviewName').textContent = '';
    document.getElementById('fotoFile').dataset.base64  = '';
    document.getElementById('fotoFile').value           = '';

    showToast('✅ ' + result.pesan);
    document.getElementById('dokumentasi').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── MODAL HELPERS ──────────────────────────────────────────── */
function bukaModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function tutupModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function initModalClose() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) tutupModal(m.id);
    });
  });
}

/* ── TOAST ──────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── NAV SCROLL ─────────────────────────────────────────────── */
function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav')
      .classList.toggle('scrolled', window.scrollY > 50);
  });
}

function setActive(el) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

/* ── FADE-IN OBSERVER ───────────────────────────────────────── */
function observeFadeIn() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => io.observe(el));
}
