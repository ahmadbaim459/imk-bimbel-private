import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
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
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Daftar Sebagai
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="border border-slate-200 rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-slate-50 relative">
                  <input type="radio" name="role" value="student" className="absolute opacity-0" defaultChecked />
                  <div className="text-center">
                    <User className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="block text-sm font-medium text-slate-900">Siswa / Orang Tua</span>
                  </div>
                </label>
                <label className="border border-slate-200 rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-slate-50 relative">
                  <input type="radio" name="role" value="teacher" className="absolute opacity-0" />
                  <div className="text-center">
                    <User className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="block text-sm font-medium text-slate-900">Guru Privat</span>
                  </div>
                </label>
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
