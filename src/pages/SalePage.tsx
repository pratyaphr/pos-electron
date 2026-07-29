import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { useSearchProduct } from "../hooks/useSearchProduct";
import { useCartStore } from "../stores";
import type { Product } from "../types";
import { Search, ShoppingCart } from "lucide-react";
import { inputModeManager } from "../core/input";
import { useGetCategories } from "../hooks/useGetCategories";

const SalePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const { items, setItems, updateQty, changeQty, clearCart, DeleteItemCart } =
    useCartStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories } = useGetCategories();

  const cate = categories?.data
    ? [{ id: null, name: "ทั้งหมด" }, ...categories?.data]
    : [];

  const { data, isLoading } = useSearchProduct(keyword, selectedCategory);

  const onSearch = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <>
      <div className="flex-1 flex overflow-hidden">
        <div className="h-full flex-1 flex flex-col bg-gray-50">
          <div className="p-4 bg-white border-b border-gray-300/40 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                onFocus={() => {
                  inputModeManager.setMode("SEARCH");
                }}
                onBlur={() => {
                  inputModeManager.setMode("BARCODE");
                }}
                placeholder="ค้นหาสินค้า"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value as string)}
              />
            </div>
          </div>

          <div className="flex w-[95%] px-4 gap-2 overflow-x-auto overflow-y-hidden ">
            {cate?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-[5rem] h-[2rem] my-3 cursor-pointer rounded-xl text-xs font-black transition-all whitespace-nowrap active:scale-95 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat?.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex-1 p-6 overflow-y-auto grid grid-cols-4 xs:grid-cols-2  md:grid-cols-3 xl:grid-cols-5 gap-4 content-start">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl  bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 h-32 rounded-lg bg-gray-200"></div>

                  <div className="mb-2 h-5 w-3/4 rounded bg-gray-200"></div>

                  <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>

                  <div className="h-8 w-full rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : data?.data && data?.data?.length > 0 ? (
            <div className="flex p-3 overflow-y-auto grid grid-cols-4 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 content-start">
              {data?.data?.map((p: Product) => (
                <ProductCard
                  key={p?.barcode}
                  product={p}
                  onAdd={(product: Product) => setItems(product)}
                />
              ))}
            </div>
          ) : (
            <div className="h-full w=full flex flex-col items-center justify-center text-gray-400 opacity-50">
              <ShoppingCart size={70} />
              <p className="mt-4 font-medium">ไม่มีรายการสินค้า</p>
            </div>
          )}
        </div>

        <CartSidebar
          cart={items ?? []}
          updateQty={updateQty}
          DeleteItemCart={DeleteItemCart}
          clearCart={clearCart}
          addToCart={(product: Product) => setItems(product)}
          changeQty={changeQty}
        />
      </div>
    </>
  );
};

export default SalePage;
