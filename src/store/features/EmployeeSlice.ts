import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  total: number;
  sortBy: string;
  search: string;
  order: 'asc' | 'desc';
}

const initialState: EmployeeState = {
  employees: [],
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: 1,
  total: 0,
  sortBy: 'id',
  order: 'asc',
  search: '',
};

export const fetchEmployees = createAsyncThunk<
  { employees: Employee[]; currentPage: number; totalPages: number; total: number },
  { page: number; limit: number; sortBy?: string; order?: 'asc' | 'desc'; search?: string }
>('employee/fetchEmployees', async ({ page, limit, sortBy = 'id', order = 'asc', search = '' }) => {
  let url = `/api/employees?page=${page}&limit=${limit}`;
  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }
  if (search) {
    url += `&search=${search}`;
  }

  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch employees');
  const result = await res.json();

  return {
    employees: result.data,
    currentPage: result.meta.page,
    totalPages: result.meta.totalPages,
    total: result.meta.total,
  };
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1; // Reset to first page when sorting changes
    },
    setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.order = action.payload;
      state.currentPage = 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1; // Reset to first page when search changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching employees';
      });
  },
});

export const { setSortBy, setOrder, setSearch } = employeeSlice.actions;
export default employeeSlice.reducer;
