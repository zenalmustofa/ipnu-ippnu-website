/**
 * ============================================================
 * IPNU IPPNU PAC Padangan — Data Layer (Backend Simulation)
 * File  : backend/data.js
 *
 * CARA PENGELOLAAN KONTEN:
 * ─────────────────────────────────────────────────────────────
 * 1. ARTIKEL
 *    Tambah/edit objek di array `artikelData`.
 *    Field `foto` bisa diisi path gambar (contoh: "assets/images/makesta.jpg")
 *    atau dikosongkan ("") agar pakai emoji + gradient fallback.
 *
 * 2. FOTO DOKUMENTASI
 *    Tambah/edit objek di array `fotoData`.
 *    Field `src` diisi path gambar atau "" untuk gradient fallback.
 *
 * 3. DEPLOY STATIS
 *    Taruh gambar di folder frontend/assets/images/
 *    lalu referensikan dengan "assets/images/nama-file.jpg"
 *
 * 4. DEPLOY DENGAN BACKEND NYATA (opsional ke depan)
 *    Ganti fungsi di backend/api.js agar fetch dari server/database.
 * ============================================================
 */

// ── GRADIENTS & EMOJI (untuk fallback tanpa foto) ──────────────
const GRADIENTS = ['g1','g2','g3','g4','g5','g6','g7','g8'];
const EMOJIS    = ['📸','🎉','🌙','🎓','🤝','🏆','📖','🌟'];

// ── DATA ARTIKEL ───────────────────────────────────────────────
// foto: "" = pakai emoji+gradient | "assets/images/xxx.jpg" = pakai foto asli
let artikelData = [
  {
    id       : 1,
    judul    : 'Pelantikan Pengurus Baru IPNU IPPNU PAC Padangan 2025',
    kategori : 'Pengumuman',
    penulis  : 'Admin',
    tanggal  : '12 Jan 2025',
    foto     : '',           // ← ganti dengan path foto jika ada
    emoji    : '🌙',
    grad     : 'g2',
    isi      : `Alhamdulillah, telah dilaksanakan pelantikan pengurus baru IPNU dan IPPNU
Pimpinan Anak Cabang Padangan periode 2025–2027 yang bertempat di Aula
Kecamatan Padangan. Acara berlangsung khidmat dan meriah dihadiri oleh jajaran
pengurus PAC, PR se-Kecamatan Padangan, dan tamu undangan. Semoga amanah ini
dapat diemban dengan sepenuh hati demi kemajuan organisasi dan umat.
Bersama kita bisa, bersatu kita teguh, Fastabiqul Khairat!`,
  },
  {
    id       : 2,
    judul    : 'Makesta Ranting Desa Banjarjo: Mencetak Kader Berkualitas',
    kategori : 'Kegiatan',
    penulis  : 'Sekretariat',
    tanggal  : '20 Feb 2025',
    foto     : '',
    emoji    : '🎓',
    grad     : 'g1',
    isi      : `Pimpinan Ranting Desa Banjarjo sukses menyelenggarakan Masa Kesetiaan Anggota
(Makesta) yang diikuti oleh 45 calon anggota baru. Kegiatan yang berlangsung
selama dua hari satu malam ini dipenuhi dengan materi ke-Aswajaan, ke-NU-an,
dan kepemimpinan. Para peserta terlihat antusias mengikuti setiap rangkaian
acara. Ini merupakan langkah awal perjalanan panjang untuk menjadi kader IPNU
IPPNU yang andal.`,
  },
  {
    id       : 3,
    judul    : 'Peringatan Hari Santri Nasional 2024 di Padangan',
    kategori : 'Keagamaan',
    penulis  : 'Tim Humas',
    tanggal  : '22 Okt 2024',
    foto     : '',
    emoji    : '🕌',
    grad     : 'g4',
    isi      : `IPNU IPPNU PAC Padangan ikut ambil bagian dalam peringatan Hari Santri Nasional
22 Oktober 2024. Ribuan pelajar dan santri se-Kecamatan Padangan memadati
alun-alun untuk melaksanakan upacara dan pawai budaya. Momen ini menjadi bukti
nyata semangat pelajar NU Padangan dalam menjaga tradisi dan mencintai tanah air.
Selamat Hari Santri — Santri Mandiri, Santri Berprestasi!`,
  },
];

// ── DATA FOTO DOKUMENTASI ──────────────────────────────────────
// src: "" = pakai emoji+gradient | "assets/images/xxx.jpg" = foto asli
let fotoData = [
  { id:1, judul:'Pelantikan Pengurus Baru 2025',  tanggal:'12 Januari 2025',  src:'', grad:'g2', emoji:'🎉' },
  { id:2, judul:'Makesta Ranting Banjarjo',        tanggal:'20 Februari 2025', src:'', grad:'g1', emoji:'🎓' },
  { id:3, judul:'Hari Santri Nasional 2024',       tanggal:'22 Oktober 2024',  src:'', grad:'g4', emoji:'🌙' },
  { id:4, judul:'Kajian Kitab Mingguan',           tanggal:'5 Maret 2025',     src:'', grad:'g3', emoji:'📖' },
  { id:5, judul:'Bakti Sosial Desa Kuncen',        tanggal:'17 Agustus 2024',  src:'', grad:'g5', emoji:'🤝' },
  { id:6, judul:'Lomba MTQ Pelajar',               tanggal:'10 April 2025',    src:'', grad:'g6', emoji:'🏆' },
];

// ── KREDENSIAL ADMIN (DEMO) ─────────────────────────────────────
// ⚠️ Untuk produksi: ganti dengan autentikasi server-side yang aman!
const ADMIN_CREDENTIALS = {
  username : 'admin',
  password : 'ipnu2025',
};

// ── HELPERS ────────────────────────────────────────────────────
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatTanggal(date) {
  return date.toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' });
}

function nextId(arr) {
  return Date.now();
}
