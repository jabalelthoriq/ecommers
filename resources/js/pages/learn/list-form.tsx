import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, CheckCircle2 } from 'lucide-react';
import Heading from '@/components/heading';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'List & Form', href: '/learn/list-form' },
];

export default function ListForm() {
    // List demo state
    const [items, setItems] = useState([{ id: '1', text: 'Belajar React' }, { id: '2', text: 'Bikin UI Keren' }]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (!newItem.trim()) return;
        setItems([...items, { id: Math.random().toString(36).slice(2), text: newItem.trim() }]);
        setNewItem('');
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Form demo state
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const [submittedData, setSubmittedData] = useState<{ title: string, priority: string } | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.length < 3) {
            setError('Title must be at least 3 characters');
            return;
        }
        setError('');
        setSubmittedData({ title, priority });
        setTitle('');
        setPriority('medium');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List & Form - Belajar React" />
            <div className="mx-auto max-w-4xl space-y-8 p-6 sm:p-8">
                <Heading 
                    title="List & Form" 
                    description="Dua hal penting dalam aplikasi real-world: me-render data sebagai list dan menerima input dari user melalui form." 
                />
                
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">1. List Rendering</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Di React, kita sering menggunakan metode <code>map()</code> dari array JavaScript untuk me-render daftar elemen. Sangat penting untuk selalu memberikan properti <code>key</code> yang unik (biasanya ID, bukan sekadar indeks array) pada setiap elemen agar React bisa melacak, menambah, atau menghapus elemen secara efisien.
                    </p>
                    
                    <Card className="border-border/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="text-lg">Demo: Dynamic List</CardTitle>
                            <CardDescription>Tambah dan hapus item. Total item: <span className="font-bold text-foreground">{items.length}</span></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="flex gap-2">
                                <Input 
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    placeholder="Tulis sesuatu..."
                                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                                    className="flex-1"
                                />
                                <Button onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Tambah</Button>
                            </div>
                            <ul className="space-y-2 mt-4">
                                {items.length === 0 ? (
                                    <li className="text-center text-muted-foreground p-4 bg-muted/20 rounded-md border border-dashed">List kosong, silakan tambah item.</li>
                                ) : (
                                    items.map(item => (
                                        <li key={item.id} className="group flex items-center justify-between p-3 border rounded-md bg-card transition-all duration-200 hover:border-primary/50">
                                            <span className="font-medium">{item.text}</span>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mt-8">2. Controlled Form</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Input form yang valuenya dikendalikan langsung oleh state React disebut <strong>Controlled Components</strong>. Setiap kali kita mengetik sesuatu, state diperbarui melalui event <code>onChange</code>, dan input me-render ulang dengan nilai baru dari state.
                    </p>
                    
                    <Card className="border-border/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="text-lg">Demo: Controlled Form</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Task</Label>
                                    <Input 
                                        id="title"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            if(error && e.target.value.length >= 3) setError('');
                                        }}
                                        placeholder="Min. 3 karakter..."
                                        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                                    />
                                    {error && <p className="text-sm text-destructive font-medium">{error}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Prioritas</Label>
                                    <select 
                                        id="priority" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <Button type="submit" className="w-full sm:w-auto">Submit Data</Button>
                            </form>

                            {submittedData && (
                                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 transition-all duration-300">
                                    <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> Data Berhasil Disubmit
                                    </h3>
                                    <pre className="text-sm bg-background p-3 rounded border">
                                        {JSON.stringify(submittedData, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mt-8">4. Contoh Kode</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">List Rendering Minimal</h3>
                            <pre className="p-4 bg-[#0d1117] text-[#c9d1d9] rounded-lg overflow-x-auto text-sm border border-border">
{`const list = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' }
];

return (
  <ul>
    {list.map(item => (
      <li key={item.id}>
        {item.name}
      </li>
    ))}
  </ul>
);`}
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Controlled Input Minimal</h3>
                            <pre className="p-4 bg-[#0d1117] text-[#c9d1d9] rounded-lg overflow-x-auto text-sm border border-border">
{`const [text, setText] = useState('');

return (
  <input 
    value={text} 
    onChange={e => setText(e.target.value)} 
    placeholder="Ketik di sini..."
  />
);`}
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mt-8">5. Checklist Praktek Baik</h2>
                    <ul className="space-y-3 bg-muted/30 p-5 rounded-lg border">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Selalu gunakan <code>key</code> yang unik dan stabil untuk setiap elemen dalam list. Hindari menggunakan index array jika item bisa ditambah, dihapus, atau diubah urutannya.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Gunakan <strong>Controlled Components</strong> untuk form agar React selalu menjadi satu-satunya sumber kebenaran (<em>single source of truth</em>) untuk nilai input.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Pisahkan fungsi handler event (seperti <code>handleSubmit</code>) dari inline JSX agar kode lebih rapi, mudah dibaca, dan mudah di-test.</span>
                        </li>
                    </ul>
                </section>

                <div className="flex justify-between items-center pt-8 border-t mt-12">
                    <Button variant="ghost" asChild>
                        <Link href="/learn/use-effect">← useEffect</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href="/learn/task-manager">Selanjutnya: Task Manager →</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
