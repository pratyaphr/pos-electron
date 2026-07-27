import { useParams, Link } from "react-router-dom";
import { useGetReceipt } from "../hooks/useGetReceipt";
import { ArrowLeft, Printer } from "lucide-react";
import type { ReceiptItem } from "../types/receipt";
import { usePrintReceipt } from "../hooks/usePrintReceipt";

interface ReceiptProps {
  Shopname?: string;
  address?: string;
  tel?: string;
  date?: string;
}

const ReceiptDetailPage = ({
  Shopname = "หจก.มาวินการเกษตร64",
  address = "13 หมู่10 ต.ผักแว่น อ.จังหาร จ.ร้อยเอ็ด 45000",
  tel = "084-7598675",
  date = new Date().toLocaleDateString("th-TH"),
}: ReceiptProps) => {
  const { id } = useParams();
  const { data } = useGetReceipt(id ?? "");

  const { mutate: print } = usePrintReceipt();

  const minRows = 7;
  const rows: (ReceiptItem | null)[] = data?.data?.items ?? [];

  while (rows.length < minRows) {
    rows.push(null);
  }

  function formatDate(dateString?: string | null): string {
    if (!dateString) return "-";

    const date = new Date(dateString.replace(" ", "T"));

    if (isNaN(date.getTime())) {
      return "-";
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      <div className="flex-1 h-screen overflow-scroll bg-slate-50/50 overflow-y-auto p-8 text-start">
        <div className="w-full mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex justify-between items-start ">
              <Link to={"/receipt"}>
                <ArrowLeft
                  size={30}
                  className="mr-2 mt-1 cursor-pointer text-blue-600  hover:text-blue-400"
                />
              </Link>
              <div>
                <h2 className="text-3xl font-black text-slate-800">
                  รายละเอียดการขาย
                </h2>
                <p className="text-slate-400 font-medium italic">
                  ตรวจสอบความถูกต้องของบิลก่อนทำการพิมพ์
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  print({
                    receiptId: Number(id),

                    options: {
                      // silent: true,
                      // printerName: "Microsoft Print to PDF",
                      paperSize: "A4",
                    },
                  })
                }
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                <Printer size={20} /> พิมพ์ใบเสร็จ
              </button>
            </div>
          </div>

          <div className="mb-10 ">
            <div className="w-[210mm] min-h-[30mm] mx-auto bg-white p-10 text-sm text-gray-800">
              <div className="flex justify-center items-center mb-2">
                <h2 className="font-bold text-lg">ใบเสร็จรับเงิน</h2>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 break-words">
                  {/* <h2 className="font-bold text-lg">ร้านค้าผู้ให้บริการ</h2> */}
                  <p>{Shopname}</p>
                  <p>{address}</p>
                  <p>โทร. {tel}</p>
                </div>

                <div className="w-1/2 break-words text-right">
                  {/* <div className="font-bold">ใบเสร็จเต็มรูปแบบ (Receipt)</div> */}

                  <p className="mt-4 font-bold">รายละเอียด</p>
                  <div>
                    รหัส :
                    <span className="ml-2 text-black  text-xs">
                      {data?.data?.receipt_no ?? "-"}
                    </span>
                  </div>
                  <p>วันที่ : {formatDate(data?.data?.created_at ?? date)}</p>
                </div>
              </div>
              <table className="w-full mt-8 border-t border-b">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 w-20">จำนวน</th>
                    <th>รายการสินค้า</th>
                    <th className="text-right w-40">ราคา</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3">{item?.quantity ?? ""}</td>

                      <td>{item?.name ?? ""}</td>

                      <td className="text-right">
                        {item?.subtotal ? item?.subtotal : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-between mt-3">
                <span className="font-bold">รวมราคาสุทธิ</span>
                <span>{data?.data?.total_amount ?? "00.00"} บาท</span>
              </div>
              <div className="flex justify-between mt-5">
                <div className="w-full">
                  <p className="font-bold">หมายเหตุ</p>
                  <div className="bg-gray-100 h-24 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailPage;
