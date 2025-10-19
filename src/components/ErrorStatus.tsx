import React from 'react';

interface ErrorStatusProps {
  errorMessage: string;
}

const ErrorStatus = ({ errorMessage }: ErrorStatusProps) => {
  return (
    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-600 border border-red-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  );
};

export default ErrorStatus;
