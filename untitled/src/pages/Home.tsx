import { Link } from 'react-router-dom';
import { Search, MapPin, BookOpen, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <header className="bg-indigo-700 px-4 sm:px-8 py-10 sm:py-16 shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Temukan Guru Privat Terbaik di Indonesia</h1>
          
          <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex flex-col md:border-r border-slate-100 px-4 py-2 md:py-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Pilih Kota</span>
              <select className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer">
                <option>Jakarta</option>
                <option>Bandung</option>
                <option>Surabaya</option>
                <option>Yogyakarta</option>
              </select>
            </div>
            
            <div className="flex-1 flex flex-col md:border-r border-slate-100 px-4 py-2 md:py-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Jenjang Pendidikan</span>
              <select className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer">
                <option>SMA</option>
                <option>SMP</option>
                <option>SD</option>
                <option>Mahasiswa</option>
              </select>
            </div>
            
            <div className="flex-1 flex flex-col px-4 py-2 md:py-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Mata Pelajaran</span>
              <select className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer">
                <option>Matematika</option>
                <option>Fisika</option>
                <option>Bahasa Inggris</option>
                <option>Pemrograman</option>
              </select>
            </div>
            
            <Link to="/search" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 md:py-0 rounded-xl font-bold transition-colors mt-2 md:mt-0 flex items-center justify-center text-center">
              Cari Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Kenapa Memilih GuruFinder?</h2>
            <p className="mt-4 text-lg text-slate-600">Kami mempertemukan siswa dengan pengajar berkualitas.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tersedia di Kota Besar</h3>
              <p className="text-slate-600">Temukan guru yang berlokasi dekat denganmu di Jakarta, Bandung, Surabaya, dan puluhan kota lainnya.</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Semua Jenjang</h3>
              <p className="text-slate-600">Mulai dari SD, SMP, SMA, Mahasiswa, hingga kelas Profesional untuk pengembangan karir.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beragam Mata Pelajaran</h3>
              <p className="text-slate-600">Matematika, Bahasa Inggris, Pemrograman, dan masih banyak lagi. Semua ada di sini.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
