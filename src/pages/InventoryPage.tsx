import { Search, Trash2, Edit3, PackagePlus, Plus } from "lucide-react";

import type { Product, Column, Categorie } from "../types";
import TableCustom from "../components/TableCustom";
import Modal from "../components/Modal";

import { useProducts } from "../hooks/useProducts";
import { useAddProduct } from "../hooks/useAddProduct";
import { useGetCategories } from "../hooks/useGetCategories";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { useDisableProduct } from "../hooks/useDisableProduct";
import ExportSelector from "../components/ExportSelector";
import { useNavigate } from "react-router-dom";
import { useCreateCategorie } from "../hooks/useCreateCategorie";
import { inputModeManager } from "../core/input";

export default function InventoryPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [disableCurren, setDisableCurren] = useState<number>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [nameCategorie, setNameCategorie] = useState("");
  const [openCategorie, setOpenCategorie] = useState(false);

  const [formData, setFormData] = useState({
    barcode: "",
    name: "",
    category_id: 1,
    price: "",
    stock_qty: "",
    cost: "",
    active: 1,
  });

  const { submit } = useAddProduct({
    onSuccess: () => {
      setOpen(false);
      setFormData({
        barcode: "",
        name: "",
        category_id: 1,
        price: "",
        stock_qty: "",
        cost: "",
        active: 1,
      });
    },
  });
  const { submit: disable } = useDisableProduct({
    onSuccess: () => setConfirm(false),
  });
  const { data, isLoading } = useProducts({ page, pageSize: 10, keyword });
  const { data: categories } = useGetCategories();

  const { submit: addCategorie, isLoading: loadingAddCategorie } =
    useCreateCategorie({
      onSuccess: () => {
        setNameCategorie("");
        setOpenCategorie(false);
      },
    });

  const columns: Column<Product>[] = [
    {
      title: "รหัสสินค้า",
      key: "barcode",
      render: (_, record) => (
        <Barcode
          value={record.barcode}
          format="CODE128"
          width={1.2}
          height={35}
          fontSize={12}
          margin={0}
          displayValue={true}
        />
      ),
    },
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
    {
      title: "Active",
      key: "active",
      render: (_, record) => (record.active === 1 ? "ใช้งาน" : "ไม่ได้ใช้งาน"),
    },
    {
      title: "จัดการ",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex justify-start gap-2 group-hover:opacity-100 transition-opacity ">
            <a
              // href={`/inventory/${record?.id}`}
              onClick={() => navigate(`/inventory/${record?.id}`)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            >
              <Edit3 size={18} />
            </a>
            <button
              disabled={record?.active == 2}
              onClick={() => {
                setDisableCurren(Number(record?.id));
                setConfirm(true);
              }}
              className={` p-2 ${record?.active == 2 ? "text-slate-500" : "text-red-500"} hover:bg-red-50 rounded-xl transition-colors ${record?.active == 2 ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  function generateEAN13() {
    const countryCode = "885";

    const randomDigits = Math.floor(
      100000000 + Math.random() * 900000000,
    ).toString();

    const base = countryCode + randomDigits.slice(0, 9);

    const digits = base.split("").map(Number);

    const sum = digits.reduce((acc, num, index) => {
      return acc + num * (index % 2 === 0 ? 1 : 3);
    }, 0);

    const checkDigit = (10 - (sum % 10)) % 10;

    const code = base + checkDigit;

    setFormData((prev) => ({ ...prev, barcode: code }));
  }

  const handleSubmit = async () => {
    const data = {
      ...formData,
      stock_qty: Number(formData.stock_qty),
      cost: Number(formData.cost),
      price: Number(formData.price),
    };
    await submit(data);
  };

  const onSearch = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const onClose = () => {
    setFormData({
      barcode: "",
      name: "",
      category_id: 1,
      price: "",
      stock_qty: "",
      cost: "",
      active: 1,
    });
    setOpen(false);
  };

  const onDisable = () => {
    if (disableCurren) {
      disable(disableCurren);
    }
  };
  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col items-start justify-start">
            <h3 className="font-bold text-xl tracking-tight">จัดการสินค้า</h3>
            <p className="text-slate-500 font-medium">
              จัดการสต็อกและรายการสินค้าในระบบของคุณ
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <PackagePlus size={20} /> เพิ่มสินค้าใหม่
            </button>
            {/* <button
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
              onClick={() => exportPDF({})}
            >
              <Upload size={20} />
            </button> */}

            <ExportSelector></ExportSelector>
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
              placeholder="ค้นหาสินค้า"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <TableCustom
          columns={columns}
          dataSource={data?.data?.items ?? []}
          pagination={true}
          onChangePage={(page) => setPage(page)}
          totalPage={data?.data?.totalPages ?? 1}
          page={page}
        />
      </div>

      <Modal
        open={confirm}
        title="ปิดใช้งานสินค้า"
        onClose={() => setConfirm(false)}
        onFinish={onDisable}
      >
        <div className="text-start p-6 space-y-4">
          <label className="text-[15px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
            คุณต้องการปิดใช้งานสินค้านี้ใช่หรือไม่?
          </label>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={onClose}
        title="เพิ่มสินค้าใหม่"
        isLoading={isLoading ?? false}
        onFinish={handleSubmit}
      >
        <div className="text-start p-6 space-y-4">
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
                  onFocus={() => {
                    inputModeManager.setMode("DIALOG");
                  }}
                  onBlur={() => {
                    inputModeManager.setMode("BARCODE");
                  }}
                  value={formData.barcode}
                  autoFocus
                  onChange={(e) =>
                    setFormData({ ...formData, barcode: e.target.value })
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
                min={1}
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
                min={1}
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
          <div className="grid grid-cols-1 gap-4">
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
          </div>
          <div className="col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
              หมวดหมู่
            </label>
            <div className="flex justify-between">
              <select
                name="category"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: Number(e.target.value),
                  })
                }
                className="w-full h-[3rem] px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none cursor-pointer"
              >
                {categories?.data?.map((v: Categorie) => (
                  <option key={v?.id} value={v?.id}>
                    {v?.name ?? "-"}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setOpenCategorie(true)}
                className="cursor-pointer h-12 ml-1 group relative flex justify-center items-center gap-2 px-2 py-1 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openCategorie}
        onClose={() => setOpenCategorie(false)}
        title="เพิ่มหมวดหมู่"
        formId="categorie"
        isLoading={loadingAddCategorie}
        onFinish={() => addCategorie(nameCategorie)}
      >
        <div className="text-start w-full p-5">
          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">
            หมวดหมู่
          </label>
          <input
            type="text"
            required
            value={nameCategorie}
            placeholder="หมวดหมู่ เช่น เตรื่องดื่ม"
            onChange={(e) => setNameCategorie(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
          />
        </div>
      </Modal>
    </div>
  );
}
