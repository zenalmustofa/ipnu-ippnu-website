/**
 * ============================================================
 * IPNU IPPNU PAC Padangan — API / Business Logic
 * File  : backend/api.js
 *
 * Berisi semua fungsi operasi data (CRUD).
 * Frontend hanya memanggil fungsi-fungsi ini — tidak langsung
 * menyentuh array data mentah.
 * ============================================================
 */

/* ── AUTH ─────────────────────────────────────────────────── */

/**
 * Verifikasi login admin.
 * @returns {boolean}
 */
function apiLogin(username, password) {
  return username === ADMIN_CREDENTIALS.username &&
         password === ADMIN_CREDENTIALS.password;
}

/* ── ARTIKEL ──────────────────────────────────────────────── */

/** Ambil semua artikel (urut terbaru dulu) */
function apiGetArtikel() {
  return [...artikelData];
}

/**
 * Tambah artikel baru.
 * @param {Object} payload - { judul, kategori, penulis, isi, foto }
 * foto boleh berupa: "" | URL string | File object (base64 dikonversi di frontend)
 */
function apiTambahArtikel(payload) {
  const { judul, kategori, penulis, isi, foto } = payload;
  if (!judul || !isi) {
    return { ok: false, pesan: 'Judul dan isi tidak boleh kosong!' };
  }
  const artikel = {
    id       : nextId(artikelData),
    judul,
    kategori : kategori || 'Kegiatan',
    penulis  : penulis  || 'Admin',
    tanggal  : formatTanggal(new Date()),
    isi,
    foto     : foto || '',
    emoji    : randomFrom(EMOJIS),
    grad     : randomFrom(GRADIENTS),
  };
  artikelData.unshift(artikel);
  return { ok: true, pesan: 'Artikel berhasil diposting!', data: artikel };
}

/**
 * Hapus artikel berdasarkan id.
 */
function apiHapusArtikel(id) {
  const idx = artikelData.findIndex(a => a.id === id);
  if (idx === -1) return { ok: false, pesan: 'Artikel tidak ditemukan.' };
  artikelData.splice(idx, 1);
  return { ok: true, pesan: 'Artikel dihapus.' };
}

/* ── FOTO DOKUMENTASI ─────────────────────────────────────── */

/** Ambil semua foto */
function apiGetFoto() {
  return [...fotoData];
}

/**
 * Tambah foto baru.
 * @param {Object} payload - { judul, tanggal, src }
 * src boleh berupa: "" | URL string | base64 data URL
 */
function apiTambahFoto(payload) {
  const { judul, tanggal, src } = payload;
  if (!judul) {
    return { ok: false, pesan: 'Judul foto tidak boleh kosong!' };
  }
  const tglStr = tanggal
    ? new Date(tanggal).toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' })
    : formatTanggal(new Date());

  const foto = {
    id     : nextId(fotoData),
    judul,
    tanggal: tglStr,
    src    : src || '',
    grad   : randomFrom(GRADIENTS),
    emoji  : randomFrom(EMOJIS),
  };
  fotoData.unshift(foto);
  return { ok: true, pesan: 'Foto berhasil diupload!', data: foto };
}

/**
 * Hapus foto berdasarkan id.
 */
function apiHapusFoto(id) {
  const idx = fotoData.findIndex(f => f.id === id);
  if (idx === -1) return { ok: false, pesan: 'Foto tidak ditemukan.' };
  fotoData.splice(idx, 1);
  return { ok: true, pesan: 'Foto dihapus.' };
}
