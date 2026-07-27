import {
  AlertCircle,
  Boxes,
  PackageCheck,
  ReceiptText,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { SummaryCard } from "../components/SummaryCard";
import { useDashboard } from "../hooks/useDashboard";
import { SalesGraph } from "../components/SalesGraph";
import ErrorContent from "../components/ErrorContent";
import type { Column } from "../types";
import TableCustom from "../components/TableCustom";

const DashboardPage = () => {
  const { data, isError } = useDashboard();

  function formatDate(): string {
    const date = new Date();

    if (isNaN(date.getTime())) {
      return "-";
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const columns: Column<any>[] = [
    {
      title: "ชื่อสินค้า",
      key: "name",
    },
    {
      title: "ราคา",
      key: "price",
    },
    {
      title: "สต็อก",
      key: "stock_qty",
    },
  ];
  return (
    <div className="text-start bg-orange-100 flex-1 bg-slate-50 overflow-y-auto p-8 t">
      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              แดชบอร์ดสรุปผล
            </h2>
            <p className="text-slate-500">ข้อมูลอัปเดต: {formatDate()}</p>
          </div>
        </div>

        {isError ? (
          <ErrorContent />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SummaryCard
                title="ยอดขายวันนี้"
                value={data?.summary?.todaySale ?? 0}
                logo={<TrendingUp size={24} />}
                type={"sale"}
                unit="บาท"
              />

              <SummaryCard
                title="จำนวนบิลวันนี้"
                value={data?.summary?.todayReceipt ?? 0}
                logo={<ReceiptText size={24} />}
                unit="บิล"
                type={"bill"}
              />

              <SummaryCard
                title="จำนวนสินค้าที่ขายวันนี้"
                value={data?.summary?.todayQty ?? 0}
                logo={<PackageCheck size={24} />}
                unit="ชิ้น"
                type={"todayQty"}
              />

              <SummaryCard
                title="จำนวนสินค้าในคลัง"
                value={data?.summary?.productCount ?? 0}
                logo={<Boxes size={24} />}
                unit="ชิ้น"
                type={"inStock"}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <SalesGraph
                data={
                  data?.sales7Days?.map((v) => {
                    return {
                      date: v.date,
                      value: v.total,
                    };
                  }) ?? []
                }
              />

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" /> สินค้าขายดี
                  </h4>
                  <button className="text-blue-600 text-[11px] font-bold uppercase tracking-tight hover:underline">
                    Ranking
                  </button>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {data?.topProducts?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-default"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-yellow-100 text-yellow-700`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-700 line-clamp-1">
                          {item?.name ?? "-"}
                        </div>
                        {/* <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          {item?.quantity ?? 0}
                        </div> */}
                      </div>
                      <div className="text-right text-xs font-black text-slate-900">
                        {item?.qty ?? 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white mt-8 rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
              <h4 className="text-lg mb-5 font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-500" />
                สินค้าเหลือน้อย
              </h4>
              <TableCustom
                columns={columns}
                dataSource={data?.lowStock ?? []}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
