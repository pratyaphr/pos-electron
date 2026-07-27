import { useEffect, useState } from "react";
import BarcodePrintQueue from "../components/BarcodePrintQueue";
import { useSearchProduct } from "../hooks/useSearchProduct";
import SelectTable from "../components/SelectTable";
import { useBarcodePrintStore } from "../stores";

const BarCodePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data } = useSearchProduct(keyword);

  const { items } = useBarcodePrintStore();

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
    <div className="flex h-screen w-full">
      <div className="flex bg-yellow-500 w-1/2">
        <div className="p-4 bg-white border-b border-gray-300/40 flex gap-4 w-full">
          <div className="relative flex-1">
            {/* <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <input
              type="text"
              placeholder="ค้นหาสินค้า"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value as string)}
            />
            <SelectTable
              data={data?.data ?? []}
              disabledIds={items.map((v) => v.productId)}
            />
          </div>
        </div>
      </div>
      <div className="flex bg-green-500 w-1/2">
        <BarcodePrintQueue />
      </div>
    </div>
  );
};

export default BarCodePage;
