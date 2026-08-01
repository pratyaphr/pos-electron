import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import TreeItem from "./TreeItem";
import type { TreeNode } from "../../types";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useExportProductCatalog } from "../../hooks/useExportProductCatalog";

export default function ExportSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const { mutate: exportPDF } = useExportProductCatalog();

  console.log("selected", selected);

  const { data } = useGetCategories();

  const Children =
    data?.data?.map((v) => {
      return {
        id: v.id,
        name: v.name,
        onClick: () => exportPDF({ categoryId: v.id, sortCreatedAt: "DESC" }),
      };
    }) ?? [];

  const CategoriesChildren = [
    ...Children,
    {
      id: null,
      name: "ทั้งหมด",
      onClick: () => exportPDF({ categoryId: null, sortCreatedAt: "DESC" }),
    },
  ];

  const treeData: TreeNode[] = [
    {
      id: 1,
      name: "หมวดหมู่",
      children: CategoriesChildren,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative w-30" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
      >
        <span>Export</span>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg z-50 w-[150px] ">
          {treeData.map((item) => (
            <TreeItem
              key={item.id}
              item={item}
              onSelect={(value) => {
                setSelected(value);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
