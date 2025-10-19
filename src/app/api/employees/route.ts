import { NextResponse } from 'next/server';

// 🧩 Mock Employee Data (more variety for pagination/filtering/sorting)
const employees = [
  { id: 1, name: 'Alice Johnson', department: 'HR', salary: 3500 },
  { id: 2, name: 'Bob Smith', department: 'IT', salary: 4200 },
  { id: 3, name: 'Charlie Brown', department: 'Finance', salary: 3900 },
  { id: 4, name: 'Diana Prince', department: 'Marketing', salary: 4100 },
  { id: 5, name: 'Ethan Clark', department: 'IT', salary: 4600 },
  { id: 6, name: 'Fiona Adams', department: 'HR', salary: 3700 },
  { id: 7, name: 'George Miller', department: 'Finance', salary: 4000 },
  { id: 8, name: 'Hannah Davis', department: 'IT', salary: 4800 },
  { id: 9, name: 'Ian White', department: 'Marketing', salary: 3950 },
  { id: 10, name: 'Julia Roberts', department: 'Finance', salary: 4300 },
  { id: 11, name: 'Kevin Lee', department: 'IT', salary: 5000 },
  { id: 12, name: 'Laura King', department: 'HR', salary: 3600 },
  { id: 13, name: 'Michael Scott', department: 'Sales', salary: 4700 },
  { id: 14, name: 'Nina Brooks', department: 'Finance', salary: 3800 },
  { id: 15, name: 'Oscar Reed', department: 'IT', salary: 5200 },
  { id: 16, name: 'Paula Young', department: 'Marketing', salary: 4050 },
  { id: 17, name: 'Quentin Tarver', department: 'Sales', salary: 4400 },
  { id: 18, name: 'Rachel Green', department: 'HR', salary: 3850 },
  { id: 19, name: 'Sam Peterson', department: 'Finance', salary: 4550 },
  { id: 20, name: 'Tina Lopez', department: 'IT', salary: 4900 },
  { id: 21, name: 'Umar Collins', department: 'Sales', salary: 4300 },
  { id: 22, name: 'Vera Hall', department: 'Marketing', salary: 4150 },
  { id: 23, name: 'Will Turner', department: 'Finance', salary: 3750 },
  { id: 24, name: 'Xavier Gray', department: 'IT', salary: 5300 },
  { id: 25, name: 'Yara Kim', department: 'Sales', salary: 4600 },
  { id: 26, name: 'Zane Morris', department: 'Finance', salary: 4000 },
];

// ✅ Add filtering, sorting, and pagination support
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search')?.toLowerCase() || '';
  const sortBy = searchParams.get('sortBy') || '';
  const order = searchParams.get('order') || 'asc';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  // 🔍 Filtering
  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search) || emp.department.toLowerCase().includes(search)
  );

  // ↕️ Sorting
  if (sortBy) {
    filtered.sort((a, b) => {
      const valueA = a[sortBy as keyof typeof a];
      const valueB = b[sortBy as keyof typeof b];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }

  // 📄 Pagination
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
