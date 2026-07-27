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
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100">
        {hasChildren ? (
          <>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-5 w-5 items-center justify-center"
            >
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Parent กดแล้วเปิด Child */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex-1 text-left font-medium hover:text-blue-600"
            >
              {item.name}
            </button>
          </>
        ) : (
          <>
            <div className="w-5" />

            {/* Leaf เท่านั้นที่เลือก */}
            <button
              onClick={item.onClick}
              className="flex-1 text-left hover:text-blue-600"
            >
              {item.name}
            </button>
          </>
        )}
      </div>

      {open &&
        item.children?.map((child) => (
          <TreeItem
            key={child.id}
            item={child}
            level={level + 1}
            onSelect={onSelect}
          />
        ))}
    </>
  );
}
