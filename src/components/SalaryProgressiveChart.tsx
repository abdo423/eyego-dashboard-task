import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';

export default function SalaryProgressiveChart() {
  const { employees, loading, error } = useAppSelector((state) => state.employee);

  const chartData = useMemo(() => {
    if (!employees || employees.length === 0) return [];

    return employees.map((emp, idx) => {
      const avgSalaryRunning = Math.round(
        employees.slice(0, idx + 1).reduce((sum, e) => sum + e.salary, 0) / (idx + 1)
      );

      return {
        employeeNum: idx + 1,
        employeeName: emp.name.split(' ')[0],
        department: emp.department,
        salary: emp.salary,
        avgSalaryRunning,
      };
    });
  }, [employees]);

  const avgSalary = useMemo(() => {
    if (!employees || employees.length === 0) return 0;
    return Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length);
  }, [employees]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!chartData.length)
    return <div className="p-6 text-center text-gray-600">No employee data available</div>;

  return (
    <Card className="border border-gray-200 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Average Salary Progression</CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          How the average salary changes as more employees are added
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="employeeNum"
              label={{
                value: 'Number of Employees',
                position: 'insideBottomRight',
                offset: -5,
              }}
            />
            <YAxis label={{ value: 'Average Salary ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              labelFormatter={(label) => `Employee #${label}`}
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <ReferenceLine
              y={avgSalary}
              stroke="#d1d5db"
              strokeDasharray="5 5"
              label={{
                value: `Final Average: $${avgSalary.toLocaleString()}`,
                position: 'right',
              }}
            />
            <Line
              type="monotone"
              dataKey="avgSalaryRunning"
              stroke="#10b981"
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={3}
              name="Running Average Salary"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
