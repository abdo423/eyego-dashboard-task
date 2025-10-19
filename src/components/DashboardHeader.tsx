'use client';
import { Loader, LogOut } from 'lucide-react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setLoading } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // Set loading to true at the start
      dispatch(setLoading(true));

      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      dispatch(logout());

      router.push('/');
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Employee Dashboard
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">Manage and view all employees</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-md whitespace-nowrap ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
