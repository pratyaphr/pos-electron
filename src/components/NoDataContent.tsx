import { WalletCards } from "lucide-react";
import type { ReactNode } from "react";

interface NoDataProps {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function NoDataContent({
  title = "ไม่มีข้อมูล",
  icon,
  action,
}: NoDataProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center  border border-dashed border-slate-300 bg-slate-50 px-8 py-14">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-slate-400">
        {icon ?? <WalletCards size={34} />}
      </div>

      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>

      {/* <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        {description}
      </p> */}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
