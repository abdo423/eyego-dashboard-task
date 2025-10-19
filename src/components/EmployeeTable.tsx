'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchEmployees } from '@/store/features/EmployeeSlice';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import EmployeeDropdownMenu from '@/components/DropdownMenu';
import SearchBar from '@/components/SearchBar';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LIMIT = 5;

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const { employees, loading, error, currentPage, totalPages, sortBy, order, search } =
    useAppSelector((state) => state.employee);

  const departmentColors = {
    HR: 'bg-blue-100 text-blue-800',
    IT: 'bg-purple-100 text-purple-800',
    Finance: 'bg-orange-100 text-orange-800',
    Marketing: 'bg-pink-100 text-pink-800',
    Sales: 'bg-green-100 text-green-800',
  };

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: LIMIT, sortBy, order, search }));
  }, [dispatch, currentPage, sortBy, order, search]);

  if (error) return <ErrorState error={error} />;
  if (loading && employees.length === 0) return <LoadingSkeleton />;
  if (!loading && employees.length === 0) return <EmptyState />;

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(fetchEmployees({ page: currentPage - 1, limit: LIMIT, sortBy, order, search }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchEmployees({ page: currentPage + 1, limit: LIMIT, sortBy, order, search }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-3">
            <SearchBar />
            <EmployeeDropdownMenu sortFilters={['id', 'name', 'salary', 'department']} />
          </div>
        </div>

        <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <CardHeader className="text-xl sm:text-2xl bg-white px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
            Employee Table
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">
                      ID
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">
                      Department
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">
                      Salary
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((emp, idx) => (
                    <tr
                      key={emp.id}
                      className={`transition-colors duration-200 ${
                        idx % 2 === 0
                          ? 'bg-white hover:bg-emerald-50'
                          : 'bg-gray-50 hover:bg-emerald-50'
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                          {emp.id}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-medium text-gray-900">{emp.name}</p>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            departmentColors[emp.department as keyof typeof departmentColors]
                          }`}
                        >
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          ${emp.salary.toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="p-4 sm:p-6 hover:bg-emerald-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                        {emp.id}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            departmentColors[emp.department as keyof typeof departmentColors]
                          }`}
                        >
                          {emp.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Salary</span>
                    <p className="font-semibold text-gray-900">${emp.salary.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center sm:justify-start"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700">
                  Page <span className="font-bold text-emerald-600">{currentPage}</span> of{' '}
                  <span className="font-bold">{totalPages}</span>
                </span>
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center sm:justify-start"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
