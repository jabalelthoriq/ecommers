import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardAdmin from '@/layouts/dashboard-admin';

export default function History() {
  const { auth } = usePage().props as any;

  return (
    <DashboardAdmin>
      <Head title="Seller History" />

      <div className="py-12 bg-gray-50/50 min-h-screen">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-700 p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Seller History</h1>
              <p className="text-blue-100 max-w-xl text-lg">
                Welcome back, {auth?.user?.name || 'Seller'}! Manage your history, track your revenue, and fulfill orders seamlessly.
              </p>
            </div>

            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </DashboardAdmin>
  );
}

  
