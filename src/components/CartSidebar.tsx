import { ShoppingCart, Plus, Minus, Trash2, SquarePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCreateReceipt } from "../hooks/useCreateReceipt";
import type { Product, CreateReceiptDto } from "../types";
// import { useCartStore } from "@/stores";

interface Cart extends Product {
  qty: number;
}

interface CartSidebarPtops {
  cart: Cart[];
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  DeleteItemCart: (id: string) => void;
  addToCart: (item: Product) => void;
  changeQty: (id: string, qty: number) => void;
}

const CartSidebar = ({
  cart,
  updateQty,
  clearCart,
  DeleteItemCart,
  addToCart,
  changeQty,
}: CartSidebarPtops) => {
  const [showAddPrice, setShowAddPrice] = useState<boolean>(false);
  const [item, setItem] = useState({
    id: "Unknown",
    barcode: "Unknown",
    name: "Unknown",
    price: "",
    stock_qty: 0,
    category: "unknown",
  });
  const [total, setTotal] = useState<number>(0);
  const [receivedInput, setReceivedInput] = useState<string>("");

  const onSuccess = () => {
    clearCart();
    document.body.tabIndex = -1;
    document.body.focus();
  };
  const { mutate } = useCreateReceipt({ onSuccess });
  // const { handleCheckout, items } = useCartStore();

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );
    setTotal(totalPrice);

    if (cart.length <= 0) {
      setReceivedInput("");
    }
  }, [cart]);

  const generateEAN13 = () => {
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

    return code;
  };

  const handleCheckout = async () => {
    const filterCart = cart.filter(
      (d) => !d.name.toLowerCase().includes("unknown"),
    );

    const items = filterCart.map((v) => {
      return {
        product_id: v.id,
        quantity: v.qty,
      };
    });

    const payload: CreateReceiptDto = {
      payment_method: "CASH",
      items,
    };
    await mutate(payload);
  };

  const addItemUnknown = () => {
    const newItem = {
      id: Number(item.id),

      category_id: Number(item.category),

      barcode: String(generateEAN13()),

      name: String(item.name),

      cost: 0,

      price: Number(item.price),

      stock_qty: Number(item.stock_qty),

      active: 1,

      created_at: "",

      updated_at: "",
    };
    addToCart(newItem);
    setItem({
      id: "Unknown",
      barcode: "Unknown",
      name: "Unknown",
      price: "",
      stock_qty: 0,
      category: "unknown",
    });
  };

  const receivedAmount = Number(receivedInput) || 0;
  const change = Math.max(0, receivedAmount - total);
  const remaining = Math.max(0, total - receivedAmount);
  // const isPaidEnough = paymentMethod !== "cash" || receivedAmount >= total;
  return (
    <>
      <div className="w-90 bg-white border-l border-gray-300/40 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-gray-300/40 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg">
                ตะกร้าสินค้า
              </h3>
              <p className="text-xs text-start text-slate-400 font-bold">
                {cart?.length ?? 0} รายการ
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              onClick={() => {
                clearCart();
                setTotal(0);
              }}
              className="text-red-500 p-2 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="text-start flex-1 overflow-y-auto p-4 space-y-4">
          {cart?.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-12">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={36} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-slate-400 text-sm">
                ยังไม่มีสินค้าในตะกร้า
              </p>
              <p className="text-xs text-slate-300 mt-1">
                กดเลือกสินค้าด้านซ้ายเพื่อเริ่มสั่งซื้อ
              </p>
            </div>
          ) : (
            cart?.map((item) => (
              <div
                key={item?.barcode}
                className="flex justify-between items-center bg-white p-1"
              >
                <div className="flex-1">
                  <p className="font-bold text-slate-800 line-clamp-1">
                    {item?.name ?? ""}
                  </p>
                  <p className="text-sm text-slate-500">
                    ฿{item?.price?.toLocaleString() ?? 0}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item?.barcode, -1)}
                    className="p-1 rounded-lg bg-gray-100 active:bg-gray-200 cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    value={item?.qty}
                    onChange={(e) =>
                      changeQty(item?.barcode, Number(e.target.value))
                    }
                    className="font-bold w-8 text-center"
                  ></input>
                  <button
                    onClick={() => updateQty(item?.barcode, 1)}
                    className="p-1 rounded-lg bg-gray-100 active:bg-gray-200 cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    onClick={() => DeleteItemCart(item?.barcode ?? 0)}
                    className="ml-1 text-gray-300 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t text-start border-gray-300/40 bg-gray-50 space-y-3 ">
          <div
            className={`p-3 overflow-hidden transition-all duration-300 ${showAddPrice ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 hidden"}`}
          >
            <div className="flex justify-between cursor-pointer">
              <h2 className="font-bold text-lg flex items-center mb-2">
                เพิ่มรายการ (สินค้าที่ไม่มีในระบบ)
              </h2>
              <X
                className="hover:bg-red-50 hover:text-red-500"
                size={20}
                onClick={() => setShowAddPrice(false)}
              />
            </div>

            <div>
              {/* <div>
                <label className="text-[12px] font-black text-slate-700 uppercase mb-1 ml-1 block tracking-widest">
                  ชื่อสินค้า :
                </label>
                <input
                  type="text"
                  value={item?.name ?? ""}
                  className="w-full pl-3 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      name: e.target.value,
                    })
                  }
                />
              </div> */}
              <div className="mt-2">
                <label className="text-[12px] font-black text-slate-700 uppercase mb-1 ml-1 block tracking-widest">
                  ราคา :
                </label>
                <div className="relative ">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ฿
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={item?.price ?? 1}
                    placeholder="เพิ่มราคา"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setItem({
                        ...item,
                        price: String(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white mt-2 pl-5 pr-5 py-2.5  border border-slate-100 rounded-xl focus:outline-none appearance-none font-bold text-slate-600 cursor-pointer hover:bg-blue-600 hover:text-white active:scale-95 transition-all "
              // onClick={() => addToCart({ ...item, barcode: generateEAN13() })}
              onClick={addItemUnknown}
            >
              ตกลง
            </button>
          </div>
          <div className="p-3 flex justify-between text-2xl font-black text-slate-900 ">
            <span>ยอดสุทธิ</span>
            <div className="flex justify-end items-center">
              <span className="text-blue-600">฿ {total.toLocaleString()}</span>

              <button
                onClick={() => setShowAddPrice(!showAddPrice)}
                className="text-gray-500 p-2 ml-2 hover:bg-red-50 hover:text-blue-500 rounded-lg cursor-pointer"
              >
                <SquarePlus size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2 p-3 border-t border-gray-300/40">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                รับเงินมา (บาท)
              </label>
              <div className="flex gap-1">
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("10")}
                  className={` text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  10
                </button>
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("20")}
                  className={`text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  20
                </button>
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("50")}
                  className={`text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  50
                </button>
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("100")}
                  className={`text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  100
                </button>
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("500")}
                  className={`text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  500
                </button>
                <button
                  disabled={cart.length <= 0}
                  onClick={() => setReceivedInput("1000")}
                  className={`text-[10px] ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"} font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"`}
                >
                  1,000
                </button>
              </div>
            </div>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                ฿
              </span>
              <input
                type="number"
                disabled={cart.length <= 0}
                placeholder="0.00"
                value={receivedInput}
                onChange={(e) => setReceivedInput(e.target.value)}
                className={`w-full pl-8 pr-3 py-2 bg-white ${cart.length == 0 ? "cursor-not-allowed" : "cursor-pointer"}  border border-slate-200 rounded-xl font-black text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm`}
                style={
                  cart.length == 0
                    ? { background: "#f3eeed" }
                    : { background: "white" }
                }
              />
            </div>
            <div
              className={`p-2.5 mb-0 rounded-xl border flex justify-between items-center transition-all `}
              style={
                receivedAmount < total
                  ? {
                      background: "#fffbeb",
                      borderColor: "#ff5f73",
                      color: "#ff5f73",
                    }
                  : {
                      background: "#fffbeb",
                      borderColor: "#5584ff",
                      color: "#5584ff",
                    }
              }
            >
              <span className="text-xs font-bold">
                {receivedAmount < total ? "ยังขาดอีก" : "เงินทอน"}
              </span>
              <span className="text-base font-black">
                ฿
                {receivedAmount < total
                  ? remaining.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })
                  : change.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                    })}
              </span>
            </div>
          </div>
          <div className="space-y-2 p-3 border-t border-gray-300/40">
            <button
              onClick={() => handleCheckout()}
              className="w-full cursor-pointer p-3 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all mt-1"
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
