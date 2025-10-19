import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Filter, Check, ArrowUpDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy, setOrder } from '@/store/features/EmployeeSlice';
import { useEffect } from 'react';

interface EmployeeDropdownMenuProps {
  sortFilters: string[];
}

const EmployeeDropdownMenu = ({ sortFilters }: EmployeeDropdownMenuProps) => {
  const dispatch = useAppDispatch();
  const { sortBy, order } = useAppSelector((state) => state.employee);

  const handleSortSelect = (filter: string) => {
    dispatch(setSortBy(filter));
  };

  const handleOrderToggle = (newOrder: 'asc' | 'desc') => {
    dispatch(setOrder(newOrder));
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* Sort By Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
          <Filter size={18} />
          Sort By: {sortBy ? sortBy.charAt(0).toUpperCase() + sortBy.slice(1) : 'None'}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-48 bg-white shadow-lg border border-gray-100 rounded-lg p-2"
          align="end"
        >
          <DropdownMenuLabel className="text-gray-500 text-sm px-2">
            Sort by field
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {sortFilters.map((filter) => (
            <DropdownMenuItem
              key={filter}
              onClick={() => handleSortSelect(filter)}
              className="hover:bg-emerald-50 hover:text-emerald-600 rounded-md cursor-pointer px-3 py-2 flex justify-between items-center"
            >
              <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              {sortBy === filter && <Check size={16} className="text-emerald-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition font-medium text-emerald-700">
          <ArrowUpDown size={18} />
          Order: {order === 'asc' ? 'Ascending' : 'Descending'}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-48 bg-white shadow-lg border border-gray-100 rounded-lg p-2"
          align="end"
        >
          <DropdownMenuLabel className="text-gray-500 text-sm px-2">Sort order</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => handleOrderToggle('asc')}
            className="hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer px-3 py-2 flex justify-between items-center"
          >
            <span>Ascending</span>
            {order === 'asc' && <Check size={16} className="text-blue-600" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleOrderToggle('desc')}
            className="hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer px-3 py-2 flex justify-between items-center"
          >
            <span>Descending</span>
            {order === 'desc' && <Check size={16} className="text-blue-600" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EmployeeDropdownMenu;
