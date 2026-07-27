import type { Column } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NoDataContent from "./NoDataContent";

interface TableCustomProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  page?: number;
  pagination?: boolean;
  onChangePage?: (page: number) => void;
  totalPage?: number;
}

const TableCustom = <T,>({
  columns,
  dataSource,
  page = 1,
  pagination = false,
  onChangePage,
  totalPage = 10,
}: TableCustomProps<T>) => {
  const getPagination = () => {
    const delta = 1; // จำนวนหน้าที่แสดงซ้าย-ขวาของหน้าปัจจุบัน
    const range: (number | string)[] = [];

    // หน้าแรก
    range.push(1);

    let start = Math.max(2, page - delta);
    let end = Math.min(totalPage - 1, page + delta);

    // ถ้าอยู่ต้น ๆ
    if (page <= 3) {
      end = Math.min(5, totalPage - 1);
    }

    // ถ้าอยู่ท้าย ๆ
    if (page >= totalPage - 2) {
      start = Math.max(2, totalPage - 4);
    }

    // ...
    if (start > 2) {
      range.push("...");
    }

    // เลขตรงกลาง
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // ...
    if (end < totalPage - 1) {
      range.push("...");
    }

    // หน้าสุดท้าย
    if (totalPage > 1) {
      range.push(totalPage);
    }

    return range;
  };
  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {columns?.map((col) => {
                  return (
                    <th
                      key={col.key}
                      className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                    >
                      {col?.title ?? ""}
                    </th>
                  );
                })}
              </tr>
            </thead>{" "}
            {dataSource.length > 0 ? (
              <tbody className="divide-y divide-slate-50">
                {dataSource?.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {columns?.map((col) => {
                      const value = row[col?.key as keyof typeof row];

                      return (
                        <td key={col?.key} className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            {col?.render
                              ? col?.render(value as T[keyof T], row)
                              : (value as React.ReactNode)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>

          {dataSource.length == 0 ? <NoDataContent /> : null}
        </div>
        {pagination ? (
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-row sm:flex-row gap-4 items-center justify-between font-bold text-xs text-slate-400 uppercase tracking-widest">
            <span></span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onChangePage?.(page - 1)}
                disabled={page === 1}
                className="cursor-pointer disabled:cursor-not-allowed w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-10 h-10 flex items-center justify-center text-slate-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => onChangePage?.(item as number)}
                    className={`cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                      page === item
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
              <button
                onClick={() => onChangePage?.(page + 1)}
                disabled={page === totalPage}
                className="cursor-pointer disabled:cursor-not-allowed w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TableCustom;
