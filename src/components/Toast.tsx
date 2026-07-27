import { CheckCircle, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastProps = {
  open: boolean;
  title: string;
  description?: string;
  type?: ToastType;
};

export default function Toast({
  open,
  title,
  description,
  type = "success",
}: ToastProps) {
  if (!open) return null;

  const styles = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle size={22} />,
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle size={22} />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <Info size={22} />,
    },
  };

  return (
    <div className="fixed text-start top-15 right-0 z-[9999] animate-in slide-in-from-right duration-300">
      <div
        className={`${styles[type].bg} text-white rounded-xl shadow-xl px-5 py-4 flex gap-4 min-w-[400px]`}
      >
        {styles[type].icon}

        <div>
          <p className="font-semibold">{title}</p>

          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
