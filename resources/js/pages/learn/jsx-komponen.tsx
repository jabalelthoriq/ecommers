import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'JSX & Komponen', href: '/learn/jsx-komponen' },
];

export default function JSXKomponen() {
    const [isOnline, setIsOnline] = useState(true);
    
    const [items, setItems] = useState<string[]>(['Belajar React', 'Bikin Komponen', 'Pahami State']);
    const [newItem, setNewItem] = useState('');
    
    const [count, setCount] = useState(0);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="JSX & Komponen" />
            <div className="mx-auto max-w-4xl space-y-12 p-6 sm:p-8">
                
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">⚛️ JSX & Komponen</h1>
                    <p className="text-muted-foreground text-lg">Blok bangunan utama di React. Mari pelajari cara kerjanya.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* JSX Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b pb-2">Apa itu JSX?</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            JSX bukanlah string HTML, melainkan <strong>ekstensi sintaks JavaScript</strong>. Di balik layar, JSX diubah menjadi pemanggilan fungsi JavaScript biasa (<code>React.createElement</code>). Karena ini JavaScript, kita bisa memasukkan variabel menggunakan kurung kurawal <code>{`{}`}</code>.
                        </p>
                    </div>

                    {/* Komponen & Props */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b pb-2">Komponen & Props</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            Komponen adalah fungsi yang mengembalikan JSX. <strong>Props</strong> adalah argumen (input) yang diberikan kepada fungsi komponen tersebut. Sifat props adalah <em>read-only</em>.
                        </p>
                        <pre className="bg-zinc-900 dark:bg-zinc-950 text-purple-400 p-4 rounded-xl overflow-x-auto font-mono text-sm shadow-inner">
{`function Hello({ name }) {
  return <h1>Halo, {name}!</h1>;
}

// Penggunaan:
<Hello name="Budi" />`}
                        </pre>
                    </div>
                </div>

                {/* Conditional Rendering */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">🔄 Conditional Rendering</h2>
                    <div className="grid md:grid-cols-2 gap-6 items-stretch">
                        <pre className="bg-zinc-900 dark:bg-zinc-950 text-cyan-400 p-4 rounded-xl overflow-x-auto font-mono text-sm h-full flex flex-col justify-center shadow-inner">
{`return (
  <div>
    {isOnline ? (
      <Badge color="green">Online</Badge>
    ) : (
      <Badge color="red">Offline</Badge>
    )}
  </div>
);`}
                        </pre>
                        
                        <div className="border-l-4 border-cyan-500 bg-muted/50 p-6 rounded-r-xl rounded-l-sm space-y-4 h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-lg flex items-center gap-2">✨ Demo Toggle Status</h3>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsOnline(!isOnline)}
                                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Ubah Status
                                </button>
                                <div className="flex items-center">
                                    {isOnline ? (
                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                                            Online
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                                            Offline
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Render List */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">📝 Render List (map & key)</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        Untuk me-render daftar data, kita menggunakan method array <code>map()</code>. Jangan lupa memberikan prop <code>key</code> yang unik pada elemen terluar di dalam <code>map</code> agar React bisa melacak elemen mana yang berubah.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        <pre className="bg-zinc-900 dark:bg-zinc-950 text-orange-400 p-4 rounded-xl overflow-x-auto font-mono text-sm shadow-inner">
{`<ul>
  {items.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>`}
                        </pre>
                        
                        <div className="border-l-4 border-orange-500 bg-muted/50 p-6 rounded-r-xl rounded-l-sm space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">✨ Demo List Todo</h3>
                            
                            <form onSubmit={handleAddItem} className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    placeholder="Tambah item..."
                                    className="flex-1 rounded-md border-input bg-background px-3 py-2 text-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
                                />
                                <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md text-sm font-medium cursor-pointer shadow-sm">
                                    Tambah
                                </button>
                            </form>

                            <ul className="space-y-2 mt-4 max-h-[200px] overflow-y-auto pr-2">
                                {items.map((item, index) => (
                                    <li key={index} className="bg-background border rounded-lg px-4 py-2 text-sm flex items-center gap-3 shadow-sm hover:border-orange-200 transition-colors">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center font-semibold text-xs border border-orange-200 dark:border-orange-800">
                                            {index + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Demo Counter */}
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">🧮 Demo Komponen Utuh (Counter)</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        Gabungan dari state dan JSX. Komponen interaktif sederhana.
                    </p>
                    
                    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-2 border-indigo-500/20 p-8 rounded-2xl flex flex-col items-center justify-center gap-8 shadow-inner">
                        <div className="text-7xl font-black tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 drop-shadow-sm">
                            {count}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setCount(c => c - 1)} className="bg-background border hover:bg-muted text-foreground px-4 py-2 rounded-xl font-medium shadow-sm active:scale-95 transition-all cursor-pointer">
                                Kurangi -
                            </button>
                            <button onClick={() => setCount(0)} className="bg-background border hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 text-foreground px-4 py-2 rounded-xl font-medium shadow-sm active:scale-95 transition-all cursor-pointer">
                                Reset
                            </button>
                            <button onClick={() => setCount(c => c + 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow-md shadow-indigo-200 dark:shadow-none active:scale-95 transition-all cursor-pointer">
                                Tambah +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Checkpoint */}
                <div className="bg-zinc-900 text-zinc-100 p-6 rounded-xl space-y-4 shadow-md">
                    <h3 className="text-xl font-bold flex items-center gap-2">🎯 Checkpoint</h3>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong>JSX</strong> adalah JavaScript, bukan string. Bisa disisipkan variabel dengan <code>{`{}`}</code>.</li>
                        <li><strong>Komponen</strong> itu sekadar fungsi JavaScript yang me-return JSX.</li>
                        <li><strong>Props</strong> adalah input fungsi, sedangkan <strong>State</strong> adalah data internal yang bisa berubah.</li>
                    </ul>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <Link href="/learn/mental-model" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        <span>←</span> Mental Model
                    </Link>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-2 font-medium">
                        Selanjutnya: State <span>→</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
