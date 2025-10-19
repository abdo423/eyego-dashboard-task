import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';

interface DepartmentData {
    department: string;
    totalSalary: number;
    avgSalary: number;
    count: number;
}

const SalaryBarchart = () => {
    const { employees, loading, error } = useAppSelector((state) => state.employee);

    const chartData = useMemo(() => {
        if (!employees.length) return [];

        const departmentMap = employees.reduce(
            (acc, emp) => {
                if (!acc[emp.department]) {
                    acc[emp.department] = {
                        department: emp.department,
                        totalSalary: 0,
                        avgSalary: 0,
                        count: 0,
                    };
                }
                acc[emp.department].totalSalary += emp.salary;
                acc[emp.department].count += 1;
                acc[emp.department].avgSalary = Math.round(
                    acc[emp.department].totalSalary / acc[emp.department].count
                );
                return acc;
            },
            {} as Record<string, DepartmentData>
        );

        return Object.values(departmentMap);
    }, [employees]);

    if (loading) return <div className="p-6">Loading chart...</div>;
    if (error) return <div className="text-red-500 p-6">Error loading chart data</div>;
    if (!chartData.length) return <div className="p-6">No data available</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Salary by Department</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                        <YAxis label={{ value: 'Salary ($)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip
                            formatter={(value) => `$${Number(value).toLocaleString()}`}
                            labelFormatter={(label) => `Department: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="avgSalary" fill="#10b981" name="Average Salary" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="totalSalary" fill="#6366f1" name="Total Salary" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {chartData.map((dept) => (
                        <div key={dept.department} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">{dept.department}</p>
                            <p className="text-lg font-semibold text-emerald-600">
                                ${dept.avgSalary.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">{dept.count} employees</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default SalaryBarchart;