import { CalendarDays } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type dataGraphType = {
  date: string;
  value: number;
};

type SalesGraphProps = {
  data: dataGraphType[];
};

export const SalesGraph = ({ data }: SalesGraphProps) => {
  return (
    <>
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <CalendarDays size={20} className="text-blue-500" /> กราฟยอดขาย
          </h4>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              label={{
                value: "วันที่",
                position: "insideBottom",
                offset: -5,
                style: {
                  // fill: "#2563EB",
                  fontSize: 14,
                  fontWeight: 600,
                },
              }}
            />

            <YAxis
              label={{
                value: "ยอดขาย(บาท)",
                angle: -90,
                position: "insideLeft",
                style: {
                  // fill: "#2563EB",
                  fontSize: 14,
                  fontWeight: 600,
                },
              }}
            />
            <Tooltip />
            <Line dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
