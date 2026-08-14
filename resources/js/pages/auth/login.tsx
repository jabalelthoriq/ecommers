import { Head, router, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

const loginSchema = z.object({
    email: z.string().min(1, "Email tidak boleh kosong").email("Format email tidak valid"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    remember: z.boolean().default(false),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { errors: serverErrors } = usePage().props as unknown as { errors: Record<string, string> };
    
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<z.input<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = (data: any) => {
        router.post(route('login'), data, {
            onFinish: () => setValue('password', ''),
        });
    };

    return (
        <AuthLayout title="Masuk ke Akun Anda" description="Masukkan email dan password Anda">
            <Head title="Masuk" />

            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            placeholder="email@example.com"
                            {...register('email')}
                        />
                        <InputError message={errors.email?.message || serverErrors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="Password"
                            {...register('password')}
                        />
                        <InputError message={errors.password?.message || serverErrors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Controller
                            name="remember"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    id="remember"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    tabIndex={3}
                                />
                            )}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white" tabIndex={4} disabled={isSubmitting}>
                        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Belum punya akun?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Daftar sekarang
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
