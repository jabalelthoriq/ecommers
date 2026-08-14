import React from 'react';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import DashboardAdmin from '@/layouts/dashboard-admin';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const profileSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export default function Settings({ mustVerifyEmail, status }: { mustVerifyEmail?: boolean; status?: string }) {
    const { auth, errors: serverErrors } = usePage<SharedData & { errors: any }>().props;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<z.input<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: auth.user.name,
            email: auth.user.email,
        },
    });

    const onSubmit = (data: any) => {
        router.patch(route('profile.update'), data, {
            preserveScroll: true,
        });
    };

    return (
        <DashboardAdmin>
            <Head title="Seller Settings" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Header Section */}
                    <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Seller Settings</h1>
                                <p className="text-gray-500 text-sm mt-1">Manage your profile and account preferences.</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="space-y-6">
                            <HeadingSmall title="Profile information" description="Update your name and email address" />

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        {...register('name')}
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError className="mt-2" message={errors.name?.message as string || serverErrors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        {...register('email')}
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError className="mt-2" message={errors.email?.message as string || serverErrors.email} />
                                </div>

                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="text-muted-foreground -mt-4 text-sm">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to resend the verification email.
                                            </Link>
                                        </p>

                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <Button disabled={isSubmitting}>Save</Button>

                                    <Transition
                                        show={isSubmitSuccessful && Object.keys(serverErrors).length === 0}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Delete Account Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <DeleteUser />
                    </div>

                </div>
            </div>
        </DashboardAdmin>
    );
}
