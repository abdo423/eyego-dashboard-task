interface SuccessStatusProps {
  successMessage: string;
}
const succesStatus = ({ successMessage }: SuccessStatusProps) => {
  return (
    <div className="mt-2 flex items-center gap-2 rounded-md bg-emerald-50 p-2 text-sm text-emerald-600 border border-emerald-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>{successMessage}</span>
    </div>
  );
};
export default succesStatus;
