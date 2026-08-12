import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, ShoppingBag, Store } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    role: 'pembeli' | 'penjual';
    name: string;
    store_name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        role: 'pembeli',
        name: '',
        store_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Buat Akun Baru" description="Lengkapi data diri Anda untuk membuat akun">
            <Head title="Daftar" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label>Pilih Peran</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setData('role', 'pembeli')}
                                className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                                    data.role === 'pembeli' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'
                                }`}
                            >
                                <ShoppingBag className={`h-8 w-8 ${data.role === 'pembeli' ? 'text-primary' : 'text-muted-foreground'}`} />
                                <div className="text-center">
                                    <div className="font-semibold">Pembeli</div>
                                    <div className="text-xs text-muted-foreground mt-1">Saya ingin berbelanja</div>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('role', 'penjual')}
                                className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                                    data.role === 'penjual' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'
                                }`}
                            >
                                <Store className={`h-8 w-8 ${data.role === 'penjual' ? 'text-primary' : 'text-muted-foreground'}`} />
                                <div className="text-center">
                                    <div className="font-semibold">Penjual</div>
                                    <div className="text-xs text-muted-foreground mt-1">Saya ingin menjual produk</div>
                                </div>
                            </button>
                        </div>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {data.role === 'penjual' && (
                        <div className="grid gap-2">
                            <Label htmlFor="store_name">Nama Toko</Label>
                            <Input
                                id="store_name"
                                type="text"
                                required={data.role === 'penjual'}
                                tabIndex={1}
                                autoComplete="organization"
                                value={data.store_name}
                                onChange={(e) => setData('store_name', e.target.value)}
                                disabled={processing}
                                placeholder="Nama Toko"
                            />
                            <InputError message={errors.store_name} />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                            id="phone"
                            type="text"
                            tabIndex={2}
                            autoComplete="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="+62..."
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Buat Akun
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Sudah punya akun?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Masuk sekarang
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
