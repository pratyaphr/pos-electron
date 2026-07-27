import { Trash2, Minus, Plus, Printer } from "lucide-react";

import { useBarcodePrintStore } from "../stores";

import { usePrintBarcode } from "../hooks/usePrintBarcode";

export default function BarcodePrintQueue() {
  const items = useBarcodePrintStore((s) => s.items);

  const increase = useBarcodePrintStore((s) => s.increase);

  const decrease = useBarcodePrintStore((s) => s.decrease);

  const remove = useBarcodePrintStore((s) => s.remove);

  const clear = useBarcodePrintStore((s) => s.clear);

  const totalLabels = useBarcodePrintStore((s) => s.totalLabels());

  const { mutate, isPending } = usePrintBarcode();

  const onPrint = () => {
    if (items.length === 0) return;

    mutate(
      {
        printer: "Xprinter XP-420B",

        products: items,
      },
      {
        onSuccess() {
          clear();
        },
      },
    );
  };

  return (
    <div className="bg-white  shadow p-4 w-full">
      <p className="font-bold text-lg mb-4 text-slate-400 uppercase tracking-widest">
        รายการที่ต้องการพิมพ์
      </p>

      <div className="space-y-3 h-[75%] overflow-auto">
        {items.length === 0 && (
          <div className="text-center text-gray-400 py-10">ไม่มีรายการ</div>
        )}

        {items.map((item) => (
          <div key={item.productId} className="border rounded-lg p-3 mt-2">
            <div className="font-semibold">{item.name}</div>

            <div className="text-xs text-gray-500">{item.barcode}</div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.productId)}
                  className="p-1 rounded-lg bg-gray-100 active:bg-gray-200 cursor-pointer"
                >
                  <Minus size={18} />
                </button>
                <div className="w-6 text-center">{item.copies}</div>

                <button
                  onClick={() => increase(item.productId)}
                  className="p-1 rounded-lg bg-gray-100 active:bg-gray-200 cursor-pointer"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => remove(item.productId)}
                className="text-red-500 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-semibold">
          <span>รวมทั้งหมด</span>

          <span>{totalLabels} ดวง</span>
        </div>

        <button
          disabled={items.length === 0 || isPending}
          onClick={onPrint}
          className="mt-4 w-full bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 disabled:bg-gray-300"
        >
          <Printer size={18} />

          {isPending ? "กำลังพิมพ์..." : "พิมพ์ Barcode"}
        </button>
      </div>
    </div>
  );
}
