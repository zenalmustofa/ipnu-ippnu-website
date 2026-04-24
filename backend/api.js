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

/** Ambil semua artikel dari Supabase (urut terbaru dulu) */
async function apiGetArtikel() {
  try {
    const data = await supabaseGetArtikel();
    return data;
  } catch (err) {
    showToast('❌ Gagal memuat artikel!');
    return [];
  }
}

/**
 * Tambah artikel baru ke Supabase.
 * @param {Object} payload - { judul, kategori, penulis, isi, foto }
 */
async function apiTambahArtikel(payload) {
  const { judul, kategori, penulis, isi, foto } = payload;
  if (!judul || !isi) {
    return { ok: false, pesan: 'Judul dan isi tidak boleh kosong!' };
  }
  
  try {
    const artikel = {
      judul,
      kategori : kategori || 'Kegiatan',
      penulis  : penulis  || 'Admin',
      tanggal  : formatTanggal(new Date()),
      isi,
      foto     : foto || '',
      emoji    : randomFrom(EMOJIS),
      grad     : randomFrom(GRADIENTS),
    };
    
    await supabaseTambahArtikel(artikel);
    return { ok: true, pesan: 'Artikel berhasil diposting!' };
  } catch (err) {
    return { ok: false, pesan: 'Gagal menyimpan artikel ke database!' };
  }
}

/**
 * Hapus artikel berdasarkan id dari Supabase.
 */
async function apiHapusArtikel(id) {
  try {
    await supabaseHapusArtikel(id);
    return { ok: true, pesan: 'Artikel dihapus.' };
  } catch (err) {
    return { ok: false, pesan: 'Gagal menghapus artikel!' };
  }
}

/* ── FOTO DOKUMENTASI ─────────────────────────────────────── */

/** Ambil semua foto dari Supabase */
async function apiGetFoto() {
  try {
    const data = await supabaseGetFoto();
    return data;
  } catch (err) {
    showToast('❌ Gagal memuat foto!');
    return [];
  }
}

/**
 * Tambah foto baru ke Supabase.
 * @param {Object} payload - { judul, tanggal, src }
 */
async function apiTambahFoto(payload) {
  const { judul, tanggal, src } = payload;
  if (!judul) {
    return { ok: false, pesan: 'Judul foto tidak boleh kosong!' };
  }

  try {
    const tglStr = tanggal
      ? new Date(tanggal).toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' })
      : formatTanggal(new Date());

    const foto = {
      judul,
      tanggal: tglStr,
      src    : src || '',
      grad   : randomFrom(GRADIENTS),
      emoji  : randomFrom(EMOJIS),
    };
    
    await supabaseTambahFoto(foto);
    return { ok: true, pesan: 'Foto berhasil diupload!' };
  } catch (err) {
    return { ok: false, pesan: 'Gagal menyimpan foto ke database!' };
  }
}

/**
 * Hapus foto berdasarkan id dari Supabase.
 */
async function apiHapusFoto(id) {
  try {
    await supabaseHapusFoto(id);
    return { ok: true, pesan: 'Foto dihapus.' };
  } catch (err) {
    return { ok: false, pesan: 'Gagal menghapus foto!' };
  }
}
