import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTasks } from './case-study/useTasks';
import type { Task } from './case-study/taskTypes';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, ListTodo, CheckCircle2, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Belajar React', href: '/learn' },
    { title: 'Task Manager', href: '/learn/task-manager' },
];

export default function TaskManager() {
    const {
        tasks,
        filter,
        setFilter,
        visibleTasks,
        stats,
        addTask,
        toggleTask,
        removeTask,
        clearDone,
    } = useTasks();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('medium');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim().length < 3) {
            setError('Task minimal 3 karakter');
            return;
        }
        addTask(title, priority);
        setTitle('');
        setPriority('medium');
        setError('');
    };

    const getPriorityColor = (p: Task['priority']) => {
        switch (p) {
            case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task Manager - Belajar React" />
            <div className="mx-auto max-w-4xl space-y-8 p-6 sm:p-8">
                <div className="flex flex-col gap-3 pb-6 border-b">
                    <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                        <ListTodo className="w-10 h-10 text-primary" />
                        Task Manager
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Studi kasus: semua konsep React diterapkan dalam satu mini-app yang fungsional.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-primary/20 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total</span>
                                <span className="text-4xl font-bold text-primary">{stats.total}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-500/5 border-blue-500/20 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Active</span>
                                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-500/5 border-green-500/20 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Done</span>
                                <span className="text-4xl font-bold text-green-600 dark:text-green-400">{stats.done}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Task Form */}
                <Card className="border-border/60 shadow-sm">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="flex-1 w-full relative">
                                <Input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="Tulis task baru di sini..."
                                    className={cn(
                                        "h-12 text-base",
                                        error && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {error && <p className="text-xs text-destructive absolute -bottom-5 left-1 font-medium">{error}</p>}
                            </div>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                                className="flex h-12 w-full sm:w-36 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                            <Button type="submit" className="w-full sm:w-auto h-12 px-6">
                                <Plus className="w-5 h-5 mr-2" />
                                Tambah
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Filter & Clear actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex p-1 bg-muted/60 rounded-lg w-full sm:w-auto border border-border/40">
                            {(['all', 'active', 'done'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={cn(
                                        "flex-1 sm:px-8 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize",
                                        filter === f 
                                            ? "bg-background text-foreground shadow-sm ring-1 ring-border" 
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        
                        {stats.done > 0 && (
                            <Button variant="outline" onClick={clearDone} className="w-full sm:w-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-dashed">
                                Hapus yang Selesai
                            </Button>
                        )}
                    </div>

                    {/* Task List */}
                    <div className="space-y-3 min-h-[300px]">
                        {visibleTasks.length === 0 ? (
                            <div className="text-center p-12 border-2 border-dashed rounded-xl bg-muted/20 flex flex-col items-center justify-center">
                                <CircleDashed className="w-16 h-16 text-muted-foreground/30 mb-4" />
                                <h3 className="text-lg font-medium text-foreground mb-1">
                                    {filter === 'all' && "Belum ada task sama sekali"}
                                    {filter === 'active' && "Semua task sudah selesai! 🎉"}
                                    {filter === 'done' && "Belum ada task yang diselesaikan"}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {filter === 'all' && "Silakan tambahkan task baru melalui form di atas."}
                                    {filter === 'active' && "Wah hebat! Kamu bisa istirahat sekarang."}
                                    {filter === 'done' && "Selesaikan beberapa task untuk melihatnya di sini."}
                                </p>
                            </div>
                        ) : (
                            visibleTasks.map((task) => (
                                <div 
                                    key={task.id}
                                    className={cn(
                                        "group flex items-center justify-between p-4 border rounded-xl bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-md",
                                        task.done && "opacity-60 bg-muted/30 border-dashed"
                                    )}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <button 
                                            onClick={() => toggleTask(task.id)}
                                            className="flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                                        >
                                            {task.done ? (
                                                <CheckCircle2 className="w-7 h-7 text-green-500 transition-transform hover:scale-110" />
                                            ) : (
                                                <div className="w-7 h-7 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/60 transition-all hover:scale-110" />
                                            )}
                                        </button>
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "font-medium text-lg transition-all duration-200",
                                                task.done ? "line-through text-muted-foreground" : "text-foreground"
                                            )}>
                                                {task.title}
                                            </span>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider", getPriorityColor(task.priority))}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    baru saja
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeTask(task.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t mt-12">
                    <Button variant="ghost" asChild>
                        <Link href="/learn/list-form">← List & Form</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href="/">🏠 Kembali ke Beranda</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
