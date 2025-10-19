export const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Controls Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-3 animate-pulse">
                    <div className="w-full md:w-64 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-full md:w-48 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Table Card Skeleton */}
            <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white animate-pulse">
                {/* Header Skeleton */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 sm:px-6 py-4 sm:py-5">
                    <div className="h-6 bg-emerald-400 rounded w-32"></div>
                </div>

                {/* Desktop Table Skeleton */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                            <th className="px-4 sm:px-6 py-4">
                                <div className="h-4 bg-emerald-400 rounded w-8"></div>
                            </th>
                            <th className="px-4 sm:px-6 py-4">
                                <div className="h-4 bg-emerald-400 rounded w-12"></div>
                            </th>
                            <th className="px-4 sm:px-6 py-4">
                                <div className="h-4 bg-emerald-400 rounded w-20"></div>
                            </th>
                            <th className="px-4 sm:px-6 py-4">
                                <div className="h-4 bg-emerald-400 rounded w-16"></div>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 sm:px-6 py-4">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards Skeleton */}
                <div className="md:hidden divide-y divide-gray-200">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 sm:p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="h-4 bg-gray-200 rounded w-12"></div>
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <div className="w-full sm:w-24 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="w-full sm:w-24 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
);