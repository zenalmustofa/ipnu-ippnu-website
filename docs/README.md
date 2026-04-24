# 🌙 Website IPNU IPPNU PAC Padangan

Website resmi Pimpinan Anak Cabang IPNU IPPNU Padangan, Bojonegoro, Jawa Timur.

---

## 📁 Struktur Direktori

```
ipnu-ippnu-padangan/
│
├── index.html                  ← Entry point utama (buka ini di browser)
│
├── frontend/                   ← Semua yang tampil di browser
│   ├── css/
│   │   └── style.css           ← Seluruh styling website
│   ├── js/
│   │   └── app.js              ← Logika UI (render, event, modal, dll.)
│   └── assets/
│       └── images/             ← ⬅ TARUH FOTO DI SINI
│           ├── makesta-2025.jpg
│           ├── hari-santri.jpg
│           └── ... (bebas beri nama)
│
├── backend/                    ← Data & logika bisnis
│   ├── data.js                 ← 📝 EDIT FILE INI untuk update konten
│   └── api.js                  ← Fungsi CRUD (tidak perlu diubah rutin)
│
└── docs/
    └── README.md               ← Dokumentasi ini
```

---

## ✏️ Cara Mengelola Konten

### 1. Menambah / Edit Artikel

Buka `backend/data.js`, lalu edit array `artikelData`:

```js
let artikelData = [
  {
    id       : 1,
    judul    : 'Judul Artikel',
    kategori : 'Kegiatan',        // Kegiatan | Pendidikan | Keagamaan | Pengumuman | Inspirasi
    penulis  : 'Nama Penulis',
    tanggal  : '12 Jan 2025',
    foto     : 'assets/images/nama-foto.jpg',  // kosongkan ("") jika tidak ada foto
    emoji    : '🎓',              // dipakai jika foto kosong
    grad     : 'g1',              // g1–g8, warna latar jika foto kosong
    isi      : `Isi artikel di sini...`,
  },
  // tambah objek baru di atas ini
];
```

**Langkah lengkap menambah artikel dengan foto:**
1. Salin foto ke `frontend/assets/images/`
2. Tambah objek baru di `artikelData` dengan `foto: "assets/images/nama.jpg"`
3. Simpan file → refresh browser

---

### 2. Menambah Foto Dokumentasi

Edit array `fotoData` di `backend/data.js`:

```js
let fotoData = [
  {
    id     : 7,
    judul  : 'Kegiatan Baru 2025',
    tanggal: '1 Mei 2025',
    src    : 'assets/images/kegiatan-baru.jpg',  // kosongkan ("") jika tidak ada foto
    grad   : 'g3',
    emoji  : '🎉',
  },
];
```

---

### 3. Mengubah Kredensial Admin

Edit di `backend/data.js`:

```js
const ADMIN_CREDENTIALS = {
  username : 'admin',       // ← ganti username
  password : 'ipnu2025',   // ← ganti password
};
```

> ⚠️ **Penting:** Ini hanya untuk demo/static site.
> Untuk produksi dengan keamanan penuh, gunakan autentikasi server-side.

---

### 4. Mengubah Informasi Organisasi

Edit langsung di `index.html` pada bagian yang relevan:
- **Nama/alamat** → cari `Padangan, Bojonegoro`
- **Link sosial media** → cari `footer-socials`
- **Statistik hero** → cari `hero-stats`
- **Visi Misi** → cari section `#tentang`

---

## 🚀 Cara Deploy

### Deploy Statis (Tanpa Server)

Cocok untuk GitHub Pages, Netlify, Vercel, atau cPanel hosting biasa.

**GitHub Pages:**
```bash
# 1. Buat repo baru di GitHub
# 2. Upload semua file
git init
git add .
git commit -m "init website ipnu ippnu padangan"
git remote add origin https://github.com/username/ipnu-ippnu-padangan.git
git push -u origin main

# 3. Aktifkan GitHub Pages di Settings > Pages > Source: main branch
```

**Netlify (drag & drop):**
1. Kunjungi netlify.com → Login
2. Drag folder `ipnu-ippnu-padangan/` ke dashboard
3. Selesai! Dapat URL gratis secara otomatis

**cPanel Hosting:**
1. Masuk ke File Manager
2. Upload semua file ke folder `public_html/`
3. Website langsung bisa diakses

---

### Menjalankan Secara Lokal

Cukup buka `index.html` di browser.
Atau gunakan live server (VS Code extension) untuk reload otomatis.

```bash
# Alternatif: jalankan server Python sederhana
cd ipnu-ippnu-padangan
python3 -m http.server 8080
# Buka: http://localhost:8080
```

---

## 🔄 Alur Update Konten (Singkat)

```
Edit backend/data.js
    ↓
Taruh foto di frontend/assets/images/  (jika ada)
    ↓
Commit & push ke GitHub / upload ke hosting
    ↓
Selesai!
```

---

## 🛠️ Teknologi

- **HTML5 + CSS3 + Vanilla JavaScript** — tanpa framework, tanpa build tool
- **Google Fonts** — Playfair Display + Plus Jakarta Sans
- **Intersection Observer API** — animasi fade-in saat scroll
- Dapat di-deploy di **mana saja** tanpa konfigurasi tambahan

---

## 📞 Kontak

- Email  : ipnu.padangan@gmail.com
- Alamat : Kecamatan Padangan, Bojonegoro, Jawa Timur
