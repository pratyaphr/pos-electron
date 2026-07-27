import { Plus } from "lucide-react";
import type { Product } from "../types";

const ProductCard: React.FC<{
  product: Product;
  onAdd: (p: Product) => void;
}> = ({ product, onAdd }) => (
  <div
    onClick={() => onAdd(product)}
    className={`text-start bg-white max-w-[12rem] min-w-[10rem] border rounded-[2rem] p-5 flex flex-col justify-between transition-all group border-slate-100 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer active:scale-95`}
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md tracking-wider">
        {product?.category_name ?? "-"}
      </span>
      <span
        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
          product?.stock_qty <= 10
            ? "bg-red-100 text-red-600"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {product?.stock_qty <= 10
          ? "สินค้าใกล้หมด"
          : `คงเหลือ ${product.stock_qty}`}
      </span>
    </div>
    <div className="my-1">
      <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug mt-0.5 group-hover:text-blue-600 transition-colors">
        {product?.name ?? "-"}
      </h3>
    </div>
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
      <span className="text-lg font-black text-slate-900">
        ฿{product?.price ?? 0}
      </span>
      <button
        disabled={product?.stock_qty <= 0}
        className={`w-9 h-9 cursor-pointer rounded-xl flex items-center justify-center transition-all ${
          false
            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
            : "bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white"
        }`}
      >
        <Plus size={18} />
      </button>
    </div>
  </div>
);

export default ProductCard;
