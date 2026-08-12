import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'useState', href: '/learn/state' },
];

export default function StatePage() {
    const [count, setCount] = useState(0);
    
    const [profile, setProfile] = useState({ name: 'John Doe', age: 25 });
    
    const [todos, setTodos] = useState([
        { id: 1, text: 'Belajar React', done: false },
        { id: 2, text: 'Makan siang', done: true },
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
        setNewTodo('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="useState - Belajar React" />
            <div className="mx-auto max-w-4xl space-y-8 p-6 sm:p-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">📦 State (useState)</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        State adalah data internal sebuah komponen yang bisa berubah seiring waktu (misalnya karena interaksi user). 
                        Ketika state berubah, React akan merender ulang komponen tersebut secara otomatis.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">🛠️ Pola Umum useState</h2>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{`const [value, setValue] = useState(initialValue)

// Update nilai secara langsung
setValue(nextValue)

// Update nilai berdasarkan nilai sebelumnya (updater function)
setValue(prev => compute(prev))`}</code>
                    </pre>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">🧪 Demo Interaktif: Counter</h2>
                    <div className="rounded-xl border-l-4 border-blue-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="text-6xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                                {count}
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button 
                                    onClick={() => setCount(c => c - 1)}
                                    className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 font-medium transition-colors"
                                >
                                    Kurangi (-)
                                </button>
                                <button 
                                    onClick={() => setCount(0)}
                                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 font-medium transition-colors"
                                >
                                    Reset
                                </button>
                                <button 
                                    onClick={() => setCount(c => c + 1)}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm"
                                >
                                    Tambah (+)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">💡 Kenapa Updater Function Penting</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        React melakukan <strong>batching</strong> pada update state untuk performa. Jika Anda memanggil <code>setCount(count + 1)</code> tiga kali dalam satu fungsi, React hanya akan melihat nilai <code>count</code> saat fungsi itu dipanggil (stale state) dan mungkin hanya bertambah 1.
                        Dengan updater function <code>setCount(c =&gt; c + 1)</code>, Anda menjamin selalu mengambil nilai yang terbaru!
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">🔄 Update Immutable - Object (Spread)</h2>
                    <p className="text-muted-foreground">
                        State di React bersifat <em>immutable</em> (tidak boleh diubah secara langsung). Untuk mengupdate object, kita membuat object baru dengan meng-copy properti lama menggunakan spread operator (<code>...</code>).
                    </p>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{`setProfile(prev => ({
  ...prev,
  age: prev.age + 1
}))`}</code>
                    </pre>

                    <div className="mt-6 rounded-xl border-l-4 border-indigo-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <h3 className="font-medium mb-4 text-lg">🧪 Demo Interaktif: Editor Profil</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                            <div className="space-y-1 text-center sm:text-left">
                                <h3 className="text-lg font-medium text-muted-foreground">Profil Pengguna</h3>
                                <div className="text-2xl font-bold">{profile.name}</div>
                                <div className="text-lg text-indigo-600 dark:text-indigo-400">{profile.age} tahun</div>
                            </div>
                            <button 
                                onClick={() => setProfile(p => ({ ...p, age: p.age + 1 }))}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors shadow-sm"
                            >
                                Ulang Tahun 🎂
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">📝 Update Immutable - Array (Map/Filter)</h2>
                    <p className="text-muted-foreground">
                        Sama seperti object, array juga tidak boleh diubah langsung. Gunakan <code>map</code> untuk mengubah item, <code>filter</code> untuk menghapus, dan spread untuk menambah.
                    </p>
                    <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm leading-relaxed text-green-400 dark:bg-zinc-950">
<code>{`// Tambah (Spread)
setTodos([...todos, newItem])

// Ubah (Map)
setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))

// Hapus (Filter)
setTodos(todos.filter(t => t.id !== id))`}</code>
                    </pre>

                    <div className="mt-6 rounded-xl border-l-4 border-emerald-500 bg-white shadow-sm dark:bg-zinc-900/50 p-6">
                        <h3 className="font-medium mb-4 text-lg">🧪 Demo Interaktif: Mini Todo List</h3>
                        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Apa yang ingin dilakukan?"
                                className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button 
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium transition-colors shadow-sm"
                            >
                                Tambah
                            </button>
                        </form>
                        
                        <div className="space-y-2">
                            {todos.map(todo => (
                                <div key={todo.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 group">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox"
                                            checked={todo.done}
                                            onChange={() => toggleTodo(todo.id)}
                                            className="w-5 h-5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <span className={`text-lg transition-all ${todo.done ? 'line-through text-zinc-400' : ''}`}>
                                            {todo.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">🏁 Checkpoint</h2>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        <li>Gunakan state untuk data internal yang bisa berubah.</li>
                        <li>Update state selalu <strong>immutable</strong> (buat copy baru).</li>
                        <li>Gunakan updater function (<code>prev =&gt; next</code>) jika update bergantung pada nilai state sebelumnya.</li>
                    </ul>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <Link href="/learn/jsx-komponen" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        ← JSX & Komponen
                    </Link>
                    <Link href="/learn/effect" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 font-medium">
                        Selanjutnya: useEffect →
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
