import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'Web Recap', href: '/learn/web-recap' },
];

const CodeBlock = ({ filename, code }: { filename: string, code: string }) => (
    <div className="rounded-xl overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 shadow-lg h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
            <span className="text-xs font-mono text-zinc-400">{filename}</span>
        </div>
        <div className="p-4 overflow-x-auto flex-1">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    </div>
);

function InteractiveCounter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-8 rounded-2xl border-2 border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-2">
                <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Interactive Demo</p>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Counter Sederhana</h3>
            </div>
            
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setCount(count - 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors text-xl font-bold"
                >
                    -
                </button>
                
                <div className="w-24 text-center">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                        {count}
                    </span>
                </div>
                
                <button 
                    onClick={() => setCount(count + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors text-xl font-bold"
                >
                    +
                </button>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Nilai di atas otomatis di-render ulang oleh React saat state berubah!
            </p>
        </div>
    );
}

export default function LearnWebRecap() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recap Web Dasar - Belajar React" />
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="space-y-4 mb-12">
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        00.1 — Konsep
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Recap Web Dasar (DOM vs React)
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Memahami perbedaan antara manipulasi DOM secara manual dengan pendekatan deklaratif yang digunakan oleh React.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Perbandingan Kode */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Imperatif (DOM Manual)</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Memerintahkan browser <strong>bagaimana</strong> cara melakukan perubahan langkah demi langkah.
                            </p>
                            <CodeBlock 
                                filename="vanilla.js" 
                                code={`const btn = document.createElement('button');
btn.innerText = 'Klik saya';

let count = 0;
const span = document.createElement('span');
span.innerText = count;

btn.addEventListener('click', () => {
  count++;
  span.innerText = count; // update manual
});

document.body.appendChild(btn);
document.body.appendChild(span);`} 
                            />
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Deklaratif (React)</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Memberitahu React <strong>apa</strong> yang ingin ditampilkan, React yang mengurus pembaruannya.
                            </p>
                            <CodeBlock 
                                filename="Counter.tsx" 
                                code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Klik saya
      </button>
      <span>{count}</span>
    </div>
  );
}`} 
                            />
                        </div>
                    </div>

                    {/* Interactive Demo */}
                    <section>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Demo Interaktif</h2>
                        <InteractiveCounter />
                    </section>

                    {/* Kebiasaan Penting */}
                    <section className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Kebiasaan Penting di React</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                                    🏗️
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Berpikir dalam Komponen</h4>
                                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Pecah UI yang kompleks menjadi potongan-potongan kecil, mandiri, dan dapat digunakan kembali.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">
                                    🔄
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Data Mengalir ke Bawah</h4>
                                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Data dikirimkan dari komponen induk ke anak melalui <em>props</em> (one-way data flow).</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 text-xl">
                                    🎯
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">UI adalah Fungsi dari State</h4>
                                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Tampilan layar merupakan representasi langsung dari data aplikasi (state) saat ini.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="mt-12 flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <Link 
                        href="/learn/setup" 
                        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <span>← Setup & Cara Menjalankan</span>
                    </Link>
                    <Link 
                        href="/learn/mental-model" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        <span>Selanjutnya →</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
