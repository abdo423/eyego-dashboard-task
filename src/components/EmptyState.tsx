export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h-6m0 0H6"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">No employees found</h3>
    <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
  </div>
);
