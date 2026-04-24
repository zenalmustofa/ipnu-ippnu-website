/**
 * ============================================================
 * IPNU IPPNU PAC Padangan — Constants & Helpers
 * File  : backend/data.js
 *
 * Berisi konstanta global dan helper functions.
 * Data artikel & foto sekarang diambil dari Supabase (cloud).
 * ============================================================
 */

// ── GRADIENTS & EMOJI (untuk fallback tanpa foto) ──────────────
const GRADIENTS = ['g1','g2','g3','g4','g5','g6','g7','g8'];
const EMOJIS    = ['📸','🎉','🌙','🎓','🤝','🏆','📖','🌟'];

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
