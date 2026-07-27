import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { useGetCategories } from "../hooks/useGetCategories";

import { ArrowLeft } from "lucide-react";
import { useGetProductsById } from "../hooks/useGetProductById";
import type { Categorie } from "../types";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

const InventoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    barcode: "",
    name: "",
    category_id: 1,
    price: "",
    stock_qty: "",
    cost: "",
    active: 1,
  });

  const { data } = useGetProductsById(id ?? "");

  console.log("useGetProductsById", data);

  const { submit } = useUpdateProduct({
    onSuccess: () => {
      navigate("/inventory");
    },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        barcode: data?.data?.barcode,
        name: data?.data?.name,
        category_id: data?.data?.category_id,
        price: String(data?.data?.price),
        stock_qty: String(data?.data?.stock_qty),
        cost: String(data?.data?.cost),
        active: data?.data?.active,
      });
    }
  }, [data]);

  const { data: Categories } = useGetCategories();

  const handleSubmit = () => {
    const newProduct = {
      id: (data?.data?.id as number) ?? id,
      barcode: formData.barcode,
      name: formData.name,
      category_id: formData.category_id,
      price: Number(formData.price),
      stock_qty: Number(formData.stock_qty),
      cost: Number(formData.cost),
      active: Number(formData.active),
    };

    console.log("handleSubmit", newProduct);

    submit(newProduct);
  };

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

  return (
    <div>
      <div className="text-start flex justify-between items-center mt-8 mb-8 ml-5">
        <div className="flex justify-between items-start ">
          <Link to={"/inventory"}>
            <ArrowLeft
              size={30}
              className="mr-2 mt-1 cursor-pointer text-blue-600  hover:text-blue-400"
              // onClick={() => navigate("/inventory")}
            />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              รายละเอียดสินค้า
            </h2>
            <p className="text-slate-400 font-medium italic">
              จัดการสต็อกและสินค้าในระบบของคุณ
            </p>
          </div>
        </div>
      </div>
      <div
        // id="product-form"
        // onSubmit={handleSubmit}
        className="text-start p-6 space-y-4"
      >
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
            รหัสสินค้า (รหัส Barcode)
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                name="barcode"
                type="text"
                placeholder="เช่น 8850123456789"
                required
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

          <div className="flex gap-3 justify-center items-center">
            <div className="col-span-1 w-full">
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
                {Categories?.data?.map((v: Categorie) => (
                  <option key={v?.id} value={v?.id}>
                    {v?.name ?? "-"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">
              Active
            </label>
            <select
              name="active"
              value={formData.active}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  active: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none cursor-pointer"
            >
              {[1, 2].map((v) => (
                <option key={v} value={v}>
                  {v ?? "-"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`flex-1 w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2
                ${false ? "bg-blue-400 cursor-not-allowed opacity-70" : "bg-blue-600 cursor-pointer text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-100"}`}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default InventoryDetailPage;
