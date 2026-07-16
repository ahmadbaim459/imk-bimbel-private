import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      // 1. Sign up in Supabase Auth with custom role metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error("Register error:", err);
      let errorMessage = err.message || 'Terjadi kesalahan saat mendaftar.';
      if (errorMessage === '{}' || errorMessage === '[object Object]' || errorMessage === 'Failed to fetch') {
        errorMessage = 'Gagal terhubung ke Supabase ("Failed to fetch"). Pastikan VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY sudah disetel di menu Environment Variables Vercel, LALU lakukan REDEPLOY (Build ulang) agar Vite bisa membaca variabel tersebut.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Registrasi Berhasil!</h2>
            <p className="text-slate-600 mb-6">
              Akun Anda telah berhasil dibuat sebagai <span className="font-semibold text-indigo-600">{role === 'teacher' ? 'Guru Privat' : 'Siswa/Orang Tua'}</span>.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left text-sm text-amber-800 mb-6">
              <p className="font-semibold mb-1">Penting:</p>
              <p>
                Jika email konfirmasi diaktifkan di dasbor Supabase Anda, silakan periksa kotak masuk email <strong>{email}</strong> untuk memverifikasi akun Anda sebelum masuk.
              </p>
            </div>
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Buat Akun Baru
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Masuk di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex gap-3 text-sm text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <div>{error}</div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Daftar Sebagai
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    role === 'student'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <User className={`w-6 h-6 mb-2 ${role === 'student' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className={`block text-sm font-medium ${role === 'student' ? 'text-indigo-950 font-bold' : 'text-slate-900'}`}>
                    Siswa / Orang Tua
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    role === 'teacher'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <User className={`w-6 h-6 mb-2 ${role === 'teacher' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className={`block text-sm font-medium ${role === 'teacher' ? 'text-indigo-950 font-bold' : 'text-slate-900'}`}>
                    Guru Privat
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border bg-white"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Kata Sandi
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
