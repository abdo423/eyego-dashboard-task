import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ error }: { error: string }) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-red-900">Error Loading Employees</h3>
        <p className="text-red-700 text-sm mt-1">{error}</p>
      </div>
    </div>
  </div>
);
