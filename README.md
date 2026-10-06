# Intelligent Academic & Activity Time-Manager

Aplikasi manajemen waktu pintar berbasis **Next.js (React)** yang dirancang untuk membantu mahasiswa dan individu sibuk dalam mengelola tugas, mengalokasikan slot waktu belajar otomatis, menyelaraskan jadwal mendadak, serta mencegah *burnout*.

---

## Masalah yang Diselesaikan

* **Kebingungan Menentukan Prioritas:** Banyaknya *deadline* sering membuat bingung memilih tugas mana yang harus didahulukan.
* **Penjadwalan Manual yang Memakan Waktu:** Mengisi celah waktu kosong (*free slots*) di antara jadwal kuliah atau rapat secara manual sangat tidak efisien.
* **Jadwal Mendadak yang Merusak Rencana:** Rapat darurat atau kelas pengganti mendadak merusak alokasi waktu belajar yang sudah disusun.
* **Risiko Burnout:** Menjejalkan terlalu banyak tugas dalam satu hari tanpa menyadari batas kapasitas energi harian.

---

## Solusi & Fitur Utama

1. **Smart Task & Priority Engine**
Menghitung **Priority Score** secara otomatis menggunakan kombinasi *Time Urgency* (pendekatan eksponensial ke *deadline*), *Academic Weight*, dan *Cognitive Load* (analisis beban mental dari AI/Gemini). Daftar tugas otomatis terurut berdasarkan tingkat urgensi paling tinggi.
2. **Dynamic Time-Blocking (Free Slot Allocator)**
Mendapatkan jadwal tetap (kuliah/rapat), memindai celah waktu kosong di kalender harian/mingguan, lalu menyelipkan blok waktu pengerjaan tugas (*STUDY_ALLOCATED*) secara otomatis.
3. **Adaptive Schedule Re-Balancer (One-Click Reschedule)**
Saat ada jadwal mendadak yang bertabrakan dengan blok belajar, sistem secara otomatis memindahkan slot belajar yang tergeser ke *free slot* berikutnya tanpa mengganggu *deadline* utama.
4. **Daily Energy & Load Balancer**
Menampilkan indikator visual kapasitas harian (*Daily Capacity Bar*). Memberikan peringatan jika total kegiatan harian melebihi batas wajar ($\ge 8-10$ jam) dan menyediakan fitur *Adaptive Task Splitting* untuk memecah tugas besar menjadi beberapa sesi.

---

## Tech Stack

* **Framework:** Next.js (App Router, TypeScript)
* **Styling:** Tailwind CSS, Lucide Icons
* **State Management:** Zustand (dengan `persist` middleware untuk LocalStorage)
* **Calendar UI:** FullCalendar (TimeGrid, DayGrid, Interaction)
* **Form & Validation:** React Hook Form, Zod
* **AI Engine:** Google Gemini API (`@google/genai`)
* **Deployment:** Wasmer App (Node.js Standalone Runner)

---

## Struktur Folder Project

```text
time-manager/
├── src/
│   ├── app/                      # App Router & API Routes
│   │   ├── api/
│   │   │   └── ai-scorer/       # Endpoint Gemini AI Scorer
│   │   ├── layout.tsx
│   │   └── page.tsx              # Main Dashboard
│   │
│   ├── features/                 # Feature-First Architecture
│   │   ├── task-engine/          # Fitur 1: Smart Priority & Task Engine
│   │   ├── time-blocking/        # Fitur 2: Matrix Kalender & Slot Allocator
│   │   ├── re-balancer/          # Fitur 3: One-Click Emergency Reschedule
│   │   └── load-balancer/        # Fitur 4: Capacity Bar & Burnout Warning
│   │
│   ├── services/                 # API Clients & AI Setup (Gemini API)
│   ├── components/               # UI Atomic Components & Navbar Layout
│   └── store/                    # Local State Management (Zustand)
│
├── next.config.ts                # Standalone Build Config
├── package.json
└── wasmer.toml                   # Wasmer Deployment Configuration

```

---

## Panduan Memulai (Local Development)

### 1. Prasyarat

Pastikan Node.js (v18+) dan npm sudah terpasang di komputer.

### 2. Clone & Install Dependencies

```bash
git clone https://github.com/gwjessica/time-manager.git
cd time-manager
npm install

```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` di root direktori project dan isi dengan API Key Google Gemini:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here

```

### 4. Jalankan Development Server

```bash
npm run dev

```

Buka browser dan akses `http://localhost:3000`.

---

## Deployment ke Wasmer App

Project ini dirancang untuk kompatibel dengan **Wasmer App**.

1. Pastikan `next.config.ts` menggunakan konfigurasi `output: 'standalone'`.
2. Pastikan `package.json` memiliki script post-build untuk menyalin hasil *standalone*:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build && cp -r .next/standalone .next-bundle 2>/dev/null || true",
  "start": "next start",
  "lint": "next lint"
}

```


3. Tambahkan `GEMINI_API_KEY` pada menu **Environment Variables** di dashboard Wasmer.
4. Lakukan `git push origin master` untuk memicu *automatic build & deployment*.
