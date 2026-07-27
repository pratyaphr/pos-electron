import { Home, ArrowLeft, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg border border-slate-100">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
          <SearchX size={52} />
        </div>

        <h1 className="mt-6 text-6xl font-extrabold text-slate-800">404</h1>

        <h2 className="mt-2 text-2xl font-bold text-slate-700">
          ไม่พบหน้าที่ต้องการ
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          หน้าที่คุณกำลังค้นหาอาจถูกลบ ย้ายตำแหน่ง หรือ URL ไม่ถูกต้อง
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
