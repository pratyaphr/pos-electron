import { AlertCircle } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorContent = ({
  title = "เกิดข้อผิดพลาด",
  message = "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
  onRetry,
}: ErrorProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center rounded-xl  bg-red-50 px-6 py-12">
      <AlertCircle className="mb-4 h-14 w-14 text-red-500" />

      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <p className="mt-2 text-center text-sm text-gray-500">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          ลองใหม่
        </button>
      )}
    </div>
  );
};

export default ErrorContent;
