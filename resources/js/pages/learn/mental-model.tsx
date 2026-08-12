import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'Mental Model', href: '/learn/mental-model' },
];

export default function MentalModel() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('demo_name') || '';
        }
        return '';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo_name', name);
        }
    }, [name]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Model React" />
            <div className="mx-auto max-w-4xl space-y-8 p-6 sm:p-8">
                
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">🧠 Mental Model React</h1>
                    <p className="text-muted-foreground text-lg">Pahami bagaimana React berpikir: Render, State, dan Effect.</p>
                </div>

                {/* Render Section */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2"><span>1️⃣</span> Render = Hitung UI</h2>
                    <p className="text-card-foreground">
                        Di React, komponen adalah <strong>fungsi</strong>. Setiap kali komponen di-render, React memanggil fungsi tersebut untuk menghitung tampilan UI-nya.
                        Render harus <em>pure</em> (murni) &mdash; artinya, dengan input yang sama, fungsi harus mengembalikan output yang sama dan tidak boleh mengubah hal lain (no side-effects) selama proses render.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="font-semibold text-green-500 flex items-center gap-1">✅ OK (Pure)</div>
                            <pre className="bg-zinc-900 dark:bg-zinc-950 text-green-400 p-4 rounded-xl overflow-x-auto font-mono text-sm">
{`function Greeting({ name }) {
  // Hanya menghitung UI
  return <h1>Halo, {name}!</h1>;
}`}
                            </pre>
                        </div>
                        <div className="space-y-2">
                            <div className="font-semibold text-red-500 flex items-center gap-1">❌ Jangan (Side-effect)</div>
                            <pre className="bg-zinc-900 dark:bg-zinc-950 text-red-400 p-4 rounded-xl overflow-x-auto font-mono text-sm">
{`let guestCount = 0;
function BadGreeting({ name }) {
  // Side-effect saat render!
  guestCount += 1; 
  return <h1>Halo, {name}!</h1>;
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* State Section */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2"><span>2️⃣</span> State = Data yang Berubah</h2>
                    <p className="text-card-foreground">
                        State adalah "ingatan" komponen. Ketika state berubah, React secara otomatis memicu proses render ulang (re-render) untuk memperbarui layar agar sesuai dengan state terbaru.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-2">
                            <pre className="bg-zinc-900 dark:bg-zinc-950 text-sky-400 p-4 rounded-xl overflow-x-auto font-mono text-sm">
{`const [count, setCount] = useState(0);

// Panggil setCount(count + 1)
// untuk mengubah data dan 
// merender ulang komponen`}
                            </pre>
                        </div>
                        <div className="border-l-4 border-blue-500 bg-muted/50 p-6 rounded-r-xl rounded-l-sm space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">✨ Interactive Demo</h3>
                            <p className="text-sm text-muted-foreground">Klik tombol di bawah untuk melihat state bekerja.</p>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setCount(count + 1)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Tambah Counter
                                </button>
                                <div className="text-2xl font-bold font-mono bg-background px-4 py-1.5 rounded-lg border">
                                    {count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Effect Section */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2"><span>3️⃣</span> Effect = Pekerjaan Setelah Render</h2>
                    <p className="text-card-foreground">
                        Effect memungkinkan kita menjalankan kode <strong>setelah</strong> proses render selesai. Ini biasanya digunakan untuk side-effects seperti sinkronisasi dengan localStorage, fetch API, atau mengatur timer.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-2">
                            <pre className="bg-zinc-900 dark:bg-zinc-950 text-yellow-400 p-4 rounded-xl overflow-x-auto font-mono text-sm">
{`useEffect(() => {
  // Berjalan SETELAH render
  localStorage.setItem('name', name);
  
  return () => {
    // Cleanup (opsional)
  };
}, [name]); // Dependency array`}
                            </pre>
                        </div>
                        <div className="border-l-4 border-yellow-500 bg-muted/50 p-6 rounded-r-xl rounded-l-sm space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">✨ Interactive Demo</h3>
                            <p className="text-sm text-muted-foreground">Ketik sesuatu, refresh halaman, dan lihat nilainya tetap ada!</p>
                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama..."
                                    className="w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border"
                                />
                                {name && (
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                        Tersimpan di localStorage
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkpoint */}
                <div className="bg-zinc-900 text-zinc-100 p-6 rounded-xl space-y-4 shadow-md">
                    <h3 className="text-xl font-bold flex items-center gap-2">🎯 Checkpoint</h3>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong>Render</strong> adalah fungsi yang mengubah State/Props menjadi UI. Harus pure.</li>
                        <li><strong>State</strong> adalah data yang bisa berubah. Perubahannya memicu re-render.</li>
                        <li><strong>Effect</strong> digunakan untuk melarikan diri dari React paradigm (berinteraksi dengan dunia luar) setelah render selesai.</li>
                    </ul>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        <span>←</span> Web Recap
                    </Link>
                    <Link href="/learn/jsx-komponen" className="text-primary hover:underline flex items-center gap-2 font-medium">
                        Selanjutnya: JSX & Komponen <span>→</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
