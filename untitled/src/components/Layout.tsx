import { Link } from 'react-router-dom';
import { BookOpen, Search, User } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-2xl">G</div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">Guru<span className="text-indigo-600">Finder</span></span>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 items-center font-medium text-slate-600 text-sm uppercase tracking-wider">
          <Link to="/search" className="text-indigo-600">Cari Guru</Link>
          <a href="#" className="hover:text-indigo-600 transition-colors">Jelajahi Kota</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Favorit</a>
        </div>

        <div className="flex gap-3">
          <Link to="/login" className="px-5 py-2 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 rounded-full transition-colors">
            Masuk
          </Link>
          <Link to="/register" className="hidden sm:inline-block px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold text-sm shadow-md hover:bg-indigo-700 transition-colors">
            Daftar Sebagai Guru
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 sm:px-8 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-slate-400 mt-auto shrink-0">
        <p>© {new Date().getFullYear()} GuruFinder Indonesia • Platform Marketplace Guru Privat</p>
        <div className="flex gap-4">
          <span>742 Guru Bergabung</span>
          <span>15 Kota Besar</span>
          <a href="#" className="hover:text-slate-600">Bantuan</a>
        </div>
      </footer>
    </div>
  );
}
