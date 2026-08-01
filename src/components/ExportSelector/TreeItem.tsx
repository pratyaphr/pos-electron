import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TreeNode } from "../../types";

interface TreeItemProps {
  item: TreeNode;
  level?: number;
  onSelect: (item: TreeNode) => void;
}

export default function TreeItem({ item, level = 0, onSelect }: TreeItemProps) {
  const [open, setOpen] = useState(true);

  const hasChildren = !!item.children?.length;

  return (
    <>
      <div
        className={`
      group flex items-center
    px-3 py-2
    transition-all duration-200
    hover:bg-slate-100
    hover:shadow-sm
    ${open ? "bg-sky-50 shadow-sm" : ""}
    `}
        style={{ paddingLeft: `${level * 18 + 8}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
          flex w-full items-center gap-2
          rounded-md
          text-left
          text-sm font-medium
          text-slate-700
          transition-colors
          cursor-pointer
          hover:text-sky-600
        "
          >
            <span
              className="
            flex h-5 w-5 items-center justify-center
            rounded
            group-hover:bg-white
            transition
          "
            >
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>

            <span className="truncate">{item.name}</span>
          </button>
        ) : (
          <>
            <div className="w-5" />

            <button
              onClick={item.onClick}
              className="
            flex-1
            truncate
            rounded-md
            py-1
            text-left
            text-sm
            text-slate-600
            transition-colors
            cursor-pointer
            hover:text-sky-600
          "
            >
              {item.name}
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-slate-200"
            style={{ left: `${level * 18 + 16}px` }}
          />

          {item.children?.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  );
}
