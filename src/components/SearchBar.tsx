import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { setSearch } from '@/store/features/EmployeeSlice';
import { useAppDispatch } from '@/store/hooks';

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (searchRef.current) {
      dispatch(setSearch(searchRef.current.value));
    }
  };

  const handleClear = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
      dispatch(setSearch(''));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="relative w-full max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          ref={searchRef}
          type="text"
          placeholder="Search..."
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
        />
      </div>
      <Button
        onClick={handleSearch}
        className="ml-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600"
      >
        Search
      </Button>
      <Button onClick={handleClear} variant="outline" className="rounded-2xl">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
