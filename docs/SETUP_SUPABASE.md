## Setup Supabase untuk Website IPNU IPPNU Padangan

Setup cloud database telah selesai! ✅

### Langkah-Langkah Setup (sudah dikerjakan):

1. **Database Supabase dibuat** ✅
   - Project: `ipnu-ippnu`
   - URL: `https://rjmsijtzuntqdrfxxvqc.supabase.co/rest/v1/`
   - Tabel `artikel` dan `foto` siap digunakan

2. **Kredensial API tersimpan di kode** ✅
   - File: `backend/supabase.js`
   - Semua proses database otomatis via REST API

3. **Kode frontend-backend terintegrasi** ✅
   - `api.js` sekarang query ke Supabase (bukan array lokal)
   - `app.js` diupdate untuk async/await
   - Data real-time dari cloud!

---

### Testing Lokal

1. **Buka index.html di browser** (mode live server)
2. **Login admin:**
   - Username: `admin`
   - Password: `ipnu2025`
3. **Tambah artikel baru**
4. **Refresh halaman** → artikel tetap ada! ✅

---

### Deploy ke Vercel

1. **Push ke Git:**
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push origin main
   ```

2. **Vercel otomatis deploy** (atau manual di vercel.com)

3. **Cek di production:**
   - Kunjungi domain Vercel Anda
   - Login & test menambah artikel
   - Data tersimpan di cloud ✅

---

### Fitur Sekarang:

✅ Admin bisa tambah artikel & foto  
✅ Data tersimpan permanen di Supabase  
✅ Akses dari mana saja (responsive)  
✅ Real-time updates di semua device  
✅ Dapat diakses publik di Vercel  

---

### Opsional: Backup Data

Untuk backup manual artikel:
1. Buka [Supabase Console](https://app.supabase.com)
2. Pilih project `ipnu-ippnu`
3. Buka tab `SQL Editor`
4. Jalankan query:
   ```sql
   SELECT * FROM artikel;
   SELECT * FROM foto;
   ```
5. Export/copy data jika perlu

---

### Troubleshooting

**Q: Artikel tidak muncul setelah tambah?**  
A: Buka browser console (F12) → lihat error message

**Q: "Failed to fetch artikel" error?**  
A: Periksa connection internet & Supabase API Key di `backend/supabase.js`

**Q: Foto tidak tersimpan?**  
A: Base64 foto mungkin terlalu besar. Gunakan foto < 2MB

---

Selamat! Website Anda sekarang fully cloud-connected! 🚀
