import { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Book, GraduationCap } from 'lucide-react';

const MOCK_TEACHERS = [
  {
    id: '1',
    name: 'Budi Santoso',
    subjects: ['Matematika', 'Fisika'],
    city: 'Jakarta',
    level: 'SMA',
    rate: 150000,
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
    description: 'Lulusan UI dengan pengalaman mengajar 5 tahun.'
  },
  {
    id: '2',
    name: 'Siti Aminah',
    subjects: ['Bahasa Inggris'],
    city: 'Bandung',
    level: 'SMP',
    rate: 100000,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    description: 'Guru Bahasa Inggris tersertifikasi TOEFL.'
  }
];

export default function Search() {
  const [city, setCity] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  return (
    <div className="flex-1 px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Filter Pencarian</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Rentang Tarif (IDR)</label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Min" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="50.000" />
                <span className="text-slate-300">-</span>
                <input type="text" placeholder="Max" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="500.000" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase">Verifikasi</label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600 rounded" /> Hanya Guru Terverifikasi
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kota</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Semua Kota</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenjang</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">Semua Jenjang</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran</label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Semua Mapel</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>
            </div>
            
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors font-bold mt-4">
              Terapkan Filter
            </button>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-2xl">
          <h4 className="font-bold text-indigo-900 text-sm mb-2">Guru Terpopuler Bulan Ini</h4>
          <p className="text-xs text-indigo-700 leading-relaxed">Dapatkan pengajar berkualitas tinggi untuk persiapan ujian masuk universitas.</p>
        </div>
      </aside>

      {/* Main Results */}
      <section className="flex-1">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800">Menampilkan Guru di {city || 'Semua Kota'}</h2>
          
          <div className="flex gap-2">
            <div className="relative hidden sm:block w-48 mr-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari..." 
                className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded shadow-sm text-slate-400 hover:text-slate-600 transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg>
            </button>
            <button className="p-2 bg-indigo-600 rounded shadow-sm text-white hover:bg-indigo-700 transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_TEACHERS.map((teacher, idx) => (
            <div key={teacher.id} className={`bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row gap-5 hover:border-indigo-300 transition-all ${idx === 1 ? 'opacity-80' : ''}`}>
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-200 rounded-xl overflow-hidden flex items-center justify-center border-4 border-slate-50 shadow-inner">
                  {teacher.photo ? (
                    <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 font-bold uppercase text-xs">Foto Guru</span>
                  )}
                </div>
                {idx === 0 && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{teacher.name}</h3>
                  <span className="text-indigo-600 font-bold whitespace-nowrap">Rp {teacher.rate.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">/ jam</span></span>
                </div>
                
                <p className="text-sm text-slate-500 mb-3">{teacher.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.subjects.map(s => (
                    <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{s}</span>
                  ))}
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">{teacher.level}</span>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span className="text-xs font-bold text-slate-400">({idx === 0 ? '12' : '8'} Review)</span>
                  </div>
                  <button className={`flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] transition-colors text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-bold shadow-sm ${idx === 1 ? 'opacity-75' : ''}`}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973l-1.127 4.113 4.209-1.104a7.864 7.864 0 0 0 3.788.969h.005c4.368 0 7.926-3.558 7.93-7.926a7.855 7.855 0 0 0-2.326-5.592l-.001-.001zM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                    Hubungi WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
