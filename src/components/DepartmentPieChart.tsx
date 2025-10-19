import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#ec4899'];

export const DepartmentPieChart = () => {
  const { employees, loading, error } = useAppSelector((state) => state.employee);

  const pieChartData = useMemo(() => {
    if (!employees || employees.length === 0) return [];

    const deptMap = employees.reduce(
      (acc, emp) => {
        const existing = acc.find((d) => d.name === emp.department);
        if (existing) existing.value += 1;
        else acc.push({ name: emp.department, value: 1 });
        return acc;
      },
      [] as Array<{ name: string; value: number }>
    );
    return deptMap;
  }, [employees]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!pieChartData.length)
    return <div className="p-6 text-center text-gray-600">No department data available</div>;

  return (
    <Card className="border border-gray-200 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Employee Distribution by Department</CardTitle>
        <p className="text-sm text-gray-600 mt-2">Number of employees in each department</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} employees`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
