import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'useEffect', href: '/learn/effect' },
];

export default function EffectPage() {
    // Demo 1: Clock
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Demo 2: Fetch Data
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState<{name: string, email: string} | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        
        async function fetchUser() {
            setLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                    signal: abortController.signal
                });
                const data = await response.json();
                setUser(data);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();

        return () => {
            abortController.abort();
        };
    }, [userId]);

    // Demo 3: Window Width
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="useEffect - Belajar React" />
            <div className="mx-auto max-w-4xl space-y-8 p-6 sm:p-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">⚡ Effect (useEffect)</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        <code>useEffect</code> memungkinkan komponen terhubung dan mensinkronisasi diri dengan sistem di luar React. 
                        Contohnya: mengambil data dari API, mengatur timer, atau memanipulasi DOM secara langsung.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">🧠 Mental Model</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
                            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">1. Render</h3>
                            <p className="text-sm text-blue-900/70 dark:text-blue-300">React memanggil komponen Anda untuk menghasilkan UI berdasarkan state saat ini.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/50">
                            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">2. Effect</h3>
                            <p className="text-sm text-purple-900/70 dark:text-purple-300">Setelah UI tampil di layar, Effect dijalankan untuk menyinkronkan dengan sistem eksternal.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50">
                            <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-2">3. Cleanup</h3>
                            <p className="text-sm text-orange-900/70 dark:text-orange-300">Sebelum Effect berjalan lagi atau komponen unmount, fungsi cleanup akan dipanggil.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">⏱️ Contoh 1: Timer + Cleanup</h2>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{"useEffect(() => {\n  const timer = setInterval(() => setTime(new Date()), 1000);\n  \n  // Cleanup function: dipanggil saat komponen unmount\n  return () => clearInterval(timer);\n}, []);"}</code>
                    </pre>

                    <div className="mt-4 rounded-xl border-l-4 border-amber-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <h3 className="text-amber-600 dark:text-amber-400 font-medium mb-6 text-center">🧪 Demo Interaktif: Jam Digital</h3>
                        <div className="flex justify-center">
                            <div className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-950 px-8 py-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800">
                                {time.toLocaleTimeString('id-ID')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">🌐 Contoh 2: Fetch Data</h2>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{"useEffect(() => {\n  const abortController = new AbortController();\n  \n  fetch(`/api/users/${userId}`, { signal: abortController.signal })\n    .then(res => res.json())\n    .then(data => setUser(data));\n\n  return () => abortController.abort(); // Batalkan fetch sebelumnya\n}, [userId]); // Berjalan ulang jika userId berubah"}</code>
                    </pre>

                    <div className="mt-4 rounded-xl border-l-4 border-cyan-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <h3 className="font-medium mb-4">🧪 Demo Interaktif: Fetch Profil Pengguna</h3>
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {[1, 2, 3, 4, 5].map(id => (
                                <button
                                    key={id}
                                    onClick={() => setUserId(id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0 ${userId === id ? 'bg-cyan-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'}`}
                                >
                                    User {id}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[120px] rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-950">
                            {loading ? (
                                <div className="flex flex-col items-center gap-3 text-cyan-600 dark:text-cyan-400">
                                    <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                                    <span className="font-medium">Mengambil data...</span>
                                </div>
                            ) : user ? (
                                <div className="text-center space-y-2">
                                    <div className="text-2xl font-bold">{user.name}</div>
                                    <div className="text-muted-foreground">{user.email}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">📏 Contoh 3: Event Listener</h2>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{"useEffect(() => {\n  const handleResize = () => setWindowWidth(window.innerWidth);\n  window.addEventListener('resize', handleResize);\n  \n  return () => window.removeEventListener('resize', handleResize);\n}, []);"}</code>
                    </pre>

                    <div className="mt-4 rounded-xl border-l-4 border-fuchsia-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <h3 className="font-medium mb-4">🧪 Demo Interaktif: Lebar Layar</h3>
                        <div className="text-center py-8 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <div className="text-sm text-muted-foreground mb-2">Lebar Window Saat Ini</div>
                            <div className="text-5xl font-black text-fuchsia-600 dark:text-fuchsia-400 tabular-nums">
                                {windowWidth}px
                            </div>
                            <div className="text-sm mt-4 opacity-70">Coba ubah ukuran browser Anda!</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">🔗 Dependency Array</h2>
                    <p className="text-muted-foreground">Parameter kedua di <code>useEffect</code> menentukan kapan effect dijalankan.</p>
                    
                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                            <div className="font-mono text-lg font-bold text-pink-500 mb-2">[]</div>
                            <div className="font-medium mb-1">Hanya saat Mount</div>
                            <p className="text-sm text-muted-foreground">Dijalankan 1x setelah komponen pertama kali tampil di layar.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_0_15px_rgba(236,72,153,0.15)] ring-1 ring-pink-500/20">
                            <div className="font-mono text-lg font-bold text-pink-500 mb-2">[a, b]</div>
                            <div className="font-medium mb-1">Saat Dependencies Berubah</div>
                            <p className="text-sm text-muted-foreground">Dijalankan jika nilai <code>a</code> atau <code>b</code> berbeda dengan render sebelumnya.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                            <div className="font-mono text-lg font-bold text-pink-500 mb-2">(tanpa array)</div>
                            <div className="font-medium mb-1">Setiap Render</div>
                            <p className="text-sm text-muted-foreground">Dijalankan SETELAH setiap kali komponen dirender. Jarang digunakan.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">🏁 Checkpoint</h2>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        <li><code>useEffect</code> adalah tempat untuk side effects (API calls, subscriptions, timers).</li>
                        <li>Selalu gunakan fungsi <strong>cleanup</strong> untuk membatalkan koneksi/timer agar terhindar dari memory leak.</li>
                        <li>Pastikan array dependensi Anda mencantumkan semua variabel reaktif (state & props) yang digunakan dalam effect.</li>
                    </ul>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <Link href="/learn/state" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        ← useState
                    </Link>
                    <Link href="/learn/list-form" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 font-medium">
                        Selanjutnya: List & Form →
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
