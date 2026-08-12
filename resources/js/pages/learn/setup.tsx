import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'Setup', href: '/learn/setup' },
];

const CodeBlock = ({ filename, code }: { filename: string, code: string }) => (
    <div className="rounded-xl overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 my-6 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
            <span className="text-xs font-mono text-zinc-400">{filename}</span>
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors group relative">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
        <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

export default function LearnSetup() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setup & Cara Menjalankan - Belajar React" />
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="space-y-4 mb-12">
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        00 — Persiapan
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Setup & Cara Menjalankan
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Mempersiapkan lingkungan pengembangan dan membuat proyek React pertama Anda menggunakan Vite.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Persiapan Lingkungan */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">1. Persiapan Lingkungan</h2>
                        <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                            <li className="flex gap-3">
                                <span className="text-blue-500">❖</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Node.js</strong> - Runtime environment untuk menjalankan JavaScript di luar browser. Minimal versi 18+.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500">❖</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">Package Manager</strong> - npm (bawaan Node.js), yarn, atau pnpm.
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500">❖</span>
                                <div>
                                    <strong className="text-zinc-900 dark:text-zinc-200">VS Code</strong> - Code editor yang sangat disarankan dengan ekstensi pendukung React.
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Membuat Project React */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">2. Membuat Project React</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Kita akan menggunakan Vite karena jauh lebih cepat dan modern dibandingkan Create React App.
                        </p>
                        <CodeBlock 
                            filename="Terminal" 
                            code={`# Scaffold project baru menggunakan Vite
npm create vite@latest my-react-app -- --template react-ts

# Masuk ke direktori
cd my-react-app

# Install dependencies
npm install

# Jalankan development server
npm run dev`} 
                        />
                    </section>

                    {/* Struktur Folder */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">3. Struktur Folder</h2>
                        <CodeBlock 
                            filename="Project Structure" 
                            code={`my-react-app/
├── node_modules/       # Dependencies (jangan diedit)
├── public/             # Asset statis (favicon, dll)
├── src/
│   ├── assets/         # Gambar, SVG, dll
│   ├── components/     # Komponen-komponen UI
│   ├── App.tsx         # Komponen utama aplikasi
│   └── main.tsx        # Entry point aplikasi
├── index.html          # Template HTML utama
├── package.json        # Info project & dependencies
└── vite.config.ts      # Konfigurasi Vite`} 
                        />
                    </section>

                    {/* Penerapan Routing */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">4. Penerapan Routing</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Banyak aplikasi modern menggunakan React Router untuk navigasi antar halaman.
                        </p>
                        <CodeBlock 
                            filename="src/main.tsx" 
                            code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import About from './pages/About'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/about', element: <About /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)`} 
                        />
                    </section>

                    {/* Roadmap Materi */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Roadmap Materi</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Recap Web Dasar', 'Mental Model', 'JSX & Komponen', 'State & Props', 'Effect & Lifecycle', 'List & Form'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="mt-12 flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <Link 
                        href="/learn" 
                        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <span>← Beranda</span>
                    </Link>
                    <Link 
                        href="/learn/web-recap" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        <span>Selanjutnya →</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
