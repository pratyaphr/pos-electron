import { useEffect, useState } from "react";

import type { Column } from "../types";
import { Eye, Search } from "lucide-react";
import TableCustom from "../components/TableCustom";
import { useListReceipts } from "../hooks/useListReceipts";
import { Link } from "react-router-dom";

const ReceiptPage = () => {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data } = useListReceipts({ page, pageSize: 10, keyword });

  const onSearch = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns: Column<any>[] = [
    {
      title: "รหัสใบเสร็จ",
      key: "receipt_no",
    },
    {
      title: "วันที่",
      key: "updated_at",
    },
    {
      title: "ยอดรวม",
      key: "total_amount",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex justify-start gap-2 group-hover:opacity-100 transition-opacity ">
            <Link
              to={`/receipt/${record?.id}`}
              // onClick={() => router.push(record.id)}
              // onClick={() => router.push(`/receipt/${record.id}`)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            >
              <Eye size={18} />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col items-start justify-start">
              <h3 className="font-bold text-xl tracking-tight">
                จัดการใบเสร็จ
              </h3>
              <p className="text-slate-500 font-medium">
                จัดการใบเสร็จในระบบของคุณ
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ค้นหาใบเสร็จ"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-2">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <select className="pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none appearance-none font-bold text-slate-600 cursor-pointer">
                {Categories?.map((v: CategorieType) => (
                  <option key={v.id} value={v.id}>
                    {v.name ?? "-"}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
          </div>

          <TableCustom
            columns={columns}
            dataSource={data?.items ?? []}
            pagination={true}
            onChangePage={(page) => setPage(page)}
            totalPage={data?.totalPages ?? 1}
            page={page}
          />
        </div>

        {/* <Modal
        open={open}
        onClose={() => setopen(false)}
        title="เพิ่มสินค้าใหม่"
        formId="product-form"
        isLoading={loadingAddProduct ?? false}
      >
        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
              รหัสสินค้า (รหัส Barcode)
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  name="code"
                  type="text"
                  placeholder="เช่น 8850123456789"
                  required
                  value={formData.code}
                  autoFocus
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                />
              </div>
              <button
                type="button"
                onClick={generateEAN13}
                className="cursor-pointer group relative flex items-center gap-2 px-5 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="hidden sm:inline">สุ่มรหัส</span>
              </button>
            </div>
            <p className="text-[10px] text-blue-500 font-bold ml-1">
              แนะนำ: หากไม่มีรหัสสินค้าคลิกปุ่มสุ่มรหัสเพื่อประหยัดเวลา
            </p>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
              ชื่อสินค้า
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="เช่น อเมริกาโน่ร้อน..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
                ราคา (บาท)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
                ราคาต้นทุน (บาท)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
                จำนวนสต็อก
              </label>
              <input
                type="number"
                name="StockQuantity"
                required
                min={1}
                value={formData.stock_qty}
                placeholder="0"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock_qty: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
              />
            </div>

            <div className="col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
                หมวดหมู่
              </label>
              <select
                name="category"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none cursor-pointer"
              >
                {Categories?.map((v: CategorieType) => (
                  <option key={v?.id} value={v?.id}>
                    {v?.name ?? "-"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal> */}
      </div>
    </>
  );
};

export default ReceiptPage;
