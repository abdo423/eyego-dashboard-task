'use client';
import type React from 'react';
import EmployeeTable from '@/components/EmployeeTable';
import DashboardHeader from '@/components/DashboardHeader';
import SalaryBarchart from '@/components/SalaryBarchart';
import { DepartmentPieChart } from '@/components/DepartmentPieChart';
import SalaryProgressiveChart from '@/components/SalaryProgressiveChart';
import ExportFiles from "@/components/ExportFiles";

export default function Dashboard() {
  return (
    < >
      <DashboardHeader />

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <EmployeeTable />
          <div>
            <SalaryBarchart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentPieChart />
            <SalaryProgressiveChart />
          </div>
            <ExportFiles/>
        </div>
      </div>
    </>
  );
}
