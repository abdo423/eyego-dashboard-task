'use client';
import type React from 'react';
import EmployeeTable from '@/components/EmployeeTable';
import DashboardHeader from '@/components/DashboardHeader';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <EmployeeTable />
    </>
  );
}
