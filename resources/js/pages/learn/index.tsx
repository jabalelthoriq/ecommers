import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Code, Lightbulb, PlayCircle, Layers, CheckCircle2, ListTodo } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
];

export default function LearnIndex() {
    const lessons = [
        {
            section: 'Persiapan & Dasar',
            items: [
                { id: '00', title: 'Setup & Cara Menjalankan', path: '/learn/setup', icon: Code, desc: 'Persiapan environment dan inisialisasi project React.' },
                { id: '00.1', title: 'Recap Web Dasar', path: '/learn/web-recap', icon: BookOpen, desc: 'Perbandingan DOM manual vs pendekatan deklaratif React.' },
                { id: '00.2', title: 'Mental Model React', path: '/learn/mental-model', icon: Lightbulb, desc: 'Memahami cara berpikir dan bekerja dengan React.' },
            ]
        },
        {
            section: 'Konsep Inti',
            items: [
                { id: '01', title: 'JSX & Komponen', path: '/learn/jsx-komponen', icon: Layers, desc: 'Menulis markup dalam JS dan memecah UI menjadi komponen.' },
                { id: '02', title: 'State (useState)', path: '/learn/state', icon: PlayCircle, desc: 'Mengelola data dinamis yang mengubah tampilan aplikasi.' },
                { id: '03', title: 'Effect (useEffect)', path: '/learn/effect', icon: PlayCircle, desc: 'Berinteraksi dengan sistem eksternal dan siklus hidup.' },
                { id: '04', title: 'List & Form', path: '/learn/list-form', icon: ListTodo, desc: 'Menampilkan data array dan mengelola input pengguna.' },
            ]
        },
        {
            section: 'Studi Kasus',
            items: [
                { id: 'Project', title: 'Task Manager', path: '/learn/task-manager', icon: CheckCircle2, desc: 'Membangun aplikasi Task Manager lengkap dengan React.' },
            ]
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Belajar React" />
            
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                        Belajar React
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        Dari Dasar → Studi Kasus
                    </p>
                </div>

                <div className="space-y-16">
                    {lessons.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{section.section}</h2>
                                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((item) => (
                                    <Link 
                                        key={item.id} 
                                        href={item.path}
                                        className="group relative flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-500/5 dark:to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        <div className="relative z-10 flex items-start justify-between mb-4">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-sm font-mono font-medium text-zinc-400 dark:text-zinc-500">
                                                {item.id}
                                            </span>
                                        </div>
                                        
                                        <div className="relative z-10 space-y-2">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
