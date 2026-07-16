# imk-bimbel-private
# 📚 Dokumentasi Lengkap: Platform Pencarian Guru Privat (Bimbel)

Selamat datang di repositori proyek **Platform Pencarian Guru Privat**. Aplikasi ini adalah *Single Page Application* (SPA) modern yang dirancang untuk mempermudah pertemuan antara siswa (atau orang tua) dengan guru privat yang tepat sesuai dengan kebutuhan pendidikan mereka.

🔗 **URL Live Project (Production):** [https://imk-bimbel-private-aan2.vercel.app/](https://imk-bimbel-private-aan2.vercel.app/)

---

## 🏗️ 1. Arsitektur & Teknologi (Tech Stack)

Aplikasi ini tidak dibangun dari nol secara manual, melainkan menggunakan sekumpulan framework dan alat bantu (tools) modern di ekosistem JavaScript/TypeScript. Berikut adalah rinciannya:

### Frontend (Antarmuka Pengguna)
*   **[React.js (v18+)](https://react.dev/):** Library JavaScript utama yang digunakan untuk membangun antarmuka pengguna (UI) berbasis komponen (*component-based*).
*   **[TypeScript](https://www.typescriptlang.org/):** Bahasa pemrograman *superset* dari JavaScript yang menambahkan fitur *static typing*. Ini sangat membantu mencegah *bug* sebelum aplikasi dijalankan dengan memastikan tipe data selalu cocok (misalnya: ID selalu berupa angka/string).
*   **[Vite](https://vitejs.dev/):** *Build tool* dan *Dev Server*. Vite menggantikan alat lama seperti *Create React App* atau Webpack karena kemampuannya yang sangat cepat (hitungan milidetik) dalam memuat perubahan kode (*Hot Module Replacement*) saat masa pengembangan lokal.
*   **[Tailwind CSS (v4)](https://tailwindcss.com/):** Framework CSS bergaya *Utility-First*. Alih-alih menulis file CSS panjang berisikan gaya, kita menggunakan *class* singkat langsung di dalam file React (contoh: `<div className="flex bg-blue-500 p-4">`).
*   **[React Router DOM (v7)](https://reactrouter.com/):** Menangani sistem navigasi. Karena ini adalah *Single Page Application*, pergantian halaman (misal dari Home ke Search) terjadi secara instan tanpa perlu memuat ulang (refresh) halaman web di browser.
*   **[Lucide React](https://lucide.dev/):** Pustaka ikon *open-source* yang minimalis dan terintegrasi sangat baik dengan proyek React.

### Backend & Database (BaaS)
*   **[Supabase](https://supabase.com/):** Proyek ini **tidak** menggunakan server backend tradisional (seperti Node.js/Express) yang berjalan terus-menerus. Kita menggunakan Supabase sebagai *Backend-as-a-Service* (BaaS). Supabase menyediakan:
    *   **PostgreSQL Database:** Database relasional yang sangat tangguh untuk menyimpan data guru, murid, mata pelajaran, dll.
    *   **Supabase Auth:** Sistem login dan registrasi (menyimpan *password* secara aman dan mengenkripsi sesi pengguna).
    *   **Row Level Security (RLS):** Aturan keamanan yang mengatur siapa yang boleh membaca atau mengubah data di database (misal: guru hanya boleh mengedit profilnya sendiri).

---

## 📂 2. Penjelasan Mendalam Source Code (`src/`)

Semua kode utama proyek berada di dalam folder `/src`. Berikut adalah pembedahan apa saja fungsi setiap file dan folder:

```text
📦 src
 ┣ 📂 components
 ┃ ┗ 📜 Layout.tsx        # Komponen pembungkus. Berisi Navbar (Menu Atas) dan Footer yang selalu tampil di setiap halaman.
 ┣ 📂 lib
 ┃ ┗ 📜 supabase.ts       # FILE KRUSIAL: Ini adalah jembatan antara kode Frontend dengan Database Supabase. Mengambil variabel URL & Key untuk inisialisasi koneksi.
 ┣ 📂 pages               # Kumpulan Halaman Utama Aplikasi
 ┃ ┣ 📜 Home.tsx          # Halaman Beranda. Berisi ucapan selamat datang dan formulir pencarian cepat (Pilih Kota, Jenjang, Mapel).
 ┃ ┣ 📜 Login.tsx         # Halaman untuk masuk akun (menjalankan supabase.auth.signInWithPassword).
 ┃ ┣ 📜 Register.tsx      # Halaman pendaftaran (menjalankan supabase.auth.signUp). Menyimpan apakah user ini 'guru' atau 'siswa'.
 ┃ ┗ 📜 Search.tsx        # Halaman Inti. Mengambil data dari Supabase, lalu menampilkan daftar (list/card) guru-guru sesuai filter dari pengguna.
 ┣ 📜 App.tsx             # Pengatur Rute (Router). Mendefinisikan bahwa URL "/" itu Home, "/search" itu Search, dst.
 ┣ 📜 index.css           # File CSS global. Tempat Tailwind CSS di-import agar seluruh class utility-nya berfungsi.
 ┣ 📜 main.tsx            # Entry point paling pertama. File ini yang memerintahkan React untuk menyuntikkan (inject) aplikasi ke dalam file HTML.
 ┗ 📜 types.ts            # Kumpulan "Kamus Data" TypeScript. Mendefinisikan seperti apa bentuk objek Guru (harus punya id, nama, bio, dll) agar terhindar dari typo.
```

---

## 🗄️ 3. Skema & Struktur Database (Supabase PostgreSQL)

Agar aplikasi dapat berjalan, diperlukan struktur tabel (*schema*) yang saling berelasi di Supabase. Ini adalah arsitektur datanya:

1.  **`users` / `profiles` (Tabel Pengguna):**
    Menyimpan data identitas pengguna.
    *   Kolom: `id` (Primary Key, nyambung ke Supabase Auth), `role` (guru/siswa), `full_name`, `email`, `bio`, `hourly_rate` (harga per jam), `city_id`.
2.  **`cities` (Tabel Kota):**
    *   Kolom: `id`, `city_name` (misal: "Jakarta", "Bandung").
3.  **`subjects` (Tabel Mata Pelajaran):**
    *   Kolom: `id`, `name` (misal: "Matematika", "Biologi").
4.  **`education_levels` (Tabel Jenjang Pendidikan):**
    *   Kolom: `id`, `name` (misal: "SD", "SMP", "SMA").
5.  **Tabel Relasi (Banyak ke Banyak / Many-to-Many):**
    Karena 1 guru bisa mengajar *banyak* mapel dan 1 mapel bisa diajarkan *banyak* guru, kita butuh tabel perantara:
    *   **`teacher_subjects`:** Menyimpan `teacher_id` dan `subject_id`.
    *   **`teacher_levels`:** Menyimpan `teacher_id` dan `level_id`.

---

## 🔐 4. Kredensial & Environment Variables (`.env`)

Untuk alasan keamanan, kunci rahasia ke database **tidak boleh** ditaruh langsung secara vulgar di dalam kode (walaupun pada sistem BaaS seperti Supabase, *Anon Key* dirancang aman jika terekspos ke browser dengan syarat RLS disetel benar). 

Kita menggunakan *Environment Variables* (Variabel Lingkungan). Aplikasi ini mewajibkan dua variabel:
1.  `VITE_SUPABASE_URL`: Tautan unik ke database proyek Anda di Supabase.
2.  `VITE_SUPABASE_ANON_KEY`: Kunci akses (API Key) untuk aplikasi melakukan tindakan baca/tulis data ke URL di atas.

Jika variabel ini tidak ada atau salah, browser akan memunculkan error **"Failed to fetch"** (Gagal mengambil data dari database).

---

## 💻 5. Cara Menjalankan Aplikasi di Komputer Sendiri (Local Dev)

Jika ada pengembang (developer) lain yang ingin menguji kode ini di laptop mereka, berikut langkah-langkah detailnya:

1.  **Prasyarat:** Pastikan [Node.js](https://nodejs.org/) sudah terinstal.
2.  **Download Kode:** Clone (unduh) repositori Github ini ke komputer.
3.  **Buka Terminal:** Masuk ke dalam folder hasil unduhan melalui Terminal atau Command Prompt (`cd nama-folder`).
4.  **Instal Modul:** Jalankan perintah `npm install`. Ini akan mengunduh semua pustaka dari internet (React, Tailwind, Supabase) dan menyimpannya di folder `node_modules/`.
5.  **Setel .env:** Buat file teks baru bernama `.env` di folder utama. Isi dengan:
    ```env
    VITE_SUPABASE_URL=paste_url_supabase_anda_di_sini
    VITE_SUPABASE_ANON_KEY=paste_anon_key_anda_di_sini
    ```
6.  **Jalankan:** Ketik perintah `npm run dev`. Aplikasi akan menyala secara lokal, biasanya dapat diakses dengan membuka alamat `http://localhost:3000` di Google Chrome / browser lainnya.

---

## 🚀 6. Proses Deployment ke Vercel (Rilis Publik)

Kode lokal di komputer perlu diunggah (*deploy*) ke server agar bisa diakses seluruh dunia. Kita menggunakan **Vercel** untuk ini.

**Alur kerjanya adalah sebagai berikut:**
1.  Source Code diunggah (push) ke **GitHub**.
2.  Kita *login* ke Dasbor **Vercel**, lalu hubungkan (*connect*) dengan repositori GitHub tersebut.
3.  Vercel akan mendeteksi bahwa ini adalah aplikasi "Vite". Vercel otomatis menyetel perintah rakit (Build Command) ke `npm run build`.
4.  **LANGKAH WAJIB:** Sebelum menekan tombol Deploy di Vercel, kita **harus** membuka menu dropdown **"Environment Variables"** di Vercel.
    *   Ketik `VITE_SUPABASE_URL` di kolom Key, dan paste link Supabase Anda di kolom Value.
    *   Ketik `VITE_SUPABASE_ANON_KEY` di kolom Key, dan paste kunci panjang Supabase di kolom Value.
    *   Klik *Add*.
5.  Tekan **Deploy**. Vercel akan merakit aplikasi Anda.
6.  Selesai! Aplikasi Anda kini memiliki URL yang *live* seperti `https://imk-bimbel-private-aan2.vercel.app/`.

**Bagaimana jika saya lupa menaruh Environment Variables di Vercel saat Deploy pertama kali?**
Aplikasi akan Error (Gagal login / "Failed to fetch"). Solusinya:
1. Buka halaman proyek di Vercel.
2. Masuk ke Tab **Settings**, klik sub-menu **Environment Variables**.
3. Tambahkan URL dan KEY Supabase-nya, lalu klik Save.
4. Buka Tab **Deployments**, klik titik tiga (`...`) pada deployment terbaru, lalu pilih **Redeploy**.
5. Vercel akan membangun ulang aplikasi menggunakan "bumbu" (variabel) baru yang baru saja Anda masukkan.

