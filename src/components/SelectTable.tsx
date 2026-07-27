import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useBarcodePrintStore } from "../stores";

interface TableProps {
  data: Product[];
  disabledIds?: number[];

  onChange?: (selected: any[]) => void;
}

const SelectTable = ({ data = [], disabledIds = [], onChange }: TableProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { add, items, remove } = useBarcodePrintStore();
  useEffect(() => {
    onChange?.(data.filter((x) => selectedIds.includes(x.id)));
  }, [selectedIds]);

  useEffect(() => {
    const selectedItems = items?.map((v) => v?.productId);
    setSelectedIds(selectedItems ?? []);
  }, [items]);

  const toggle = (item: Product) => {
    // clear();
    const findItem = items.find((v) => v.productId == item.id);
    if (findItem) {
      console.log("findItem", findItem);
      remove(item.id);
    } else {
      add({
        productId: item.id,
        name: item.name,
        barcode: item.barcode,
        price: item.price,
      });
    }

    // setSelectedIds((prev) =>
    //   prev.includes(item.id)
    //     ? prev.filter((x) => x !== item.id)
    //     : [...prev, item.id],
    // );
  };
  return (
    <div className="max-h-[700px] mt-3 overflow-auto rounded">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="bg-slate-30 border-b border-slate-100">
            <th className="px-6 py-4 text-[40px] font-black text-slate-400 uppercase tracking-widest"></th>
            <th className="px-6 py-4 text-[15px] font-black text-slate-400 uppercase tracking-widest">
              ชื่อ
            </th>
            <th className="px-6 py-4 text-[15px] font-black text-slate-400 uppercase tracking-widest">
              ราคา
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const disabled = disabledIds.includes(item.id);

            return (
              <tr
                key={item.id}
                className={` transition
                ${disabled ? "opacity-40 bg-gray-100" : "transition-colors group hover:bg-gray-50"}`}
              >
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    // disabled={disabled}
                    onChange={() => toggle(item)}
                  />
                </td>

                <td className="px-6 py-4 text-start">{item.name}</td>

                <td className="px-6 py-4 text-start">{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SelectTable;
