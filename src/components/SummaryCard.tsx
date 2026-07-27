import React from "react";

type Type = "sale" | "bill" | "inStock" | "outOfStock" | "todayQty";

const ColorIcon: Record<Type, string> = {
  sale: "text-blue-600",
  bill: "text-orange-600",
  inStock: "text-green-600",
  outOfStock: "text-red-600",
  todayQty: "text-yellow-600",
};

const BgIcon: Record<Type, string> = {
  sale: "bg-blue-50",
  bill: "bg-orange-50",
  inStock: "bg-green-50",
  outOfStock: "bg-red-50",
  todayQty: "text-yellow-50",
};

interface SummaryCardProps {
  logo: React.ReactNode;
  title: string;
  value?: number;
  unit?: string;
  type?: Type;
}

export const SummaryCard = ({
  logo,
  type = "sale",
  unit,
  title,
  value = 0,
}: SummaryCardProps) => {
  return (
    <>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 ${BgIcon[type]} ${ColorIcon[type]} rounded-2xl`}>
            {logo}
          </div>
        </div>

        <p className="text-slate-500 font-medium"> {title}</p>
        <h3 className="text-2xl font-black text-slate-800">
          {value.toLocaleString()} {unit ? unit : ""}
        </h3>
      </div>
    </>
  );
};
