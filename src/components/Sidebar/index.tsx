import {
  Package,
  BarChart3,
  ReceiptText,
  LogOut,
  Barcode,
  ShoppingCart,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
// import { useAuthStore } from "@/stores/useAuthStore";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const Pathname =
    useLocation().pathname === "/" ? "/" : useLocation().pathname.split("/")[1];
  // const { auth, logout } = useAuthStore();

  return (
    <>
      <nav className="w-24 bg-white border-r border-gray-300/40 flex flex-col justify-between z-20">
        <div>
          <div className="p-4 flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-blue-200 shadow-lg">
              P
            </div>
          </div>

          <div className="space-y-1">
            <SidebarItem
              icon={ShoppingCart}
              label="หน้าขาย"
              id="/"
              active={Pathname === "/"}
            />{" "}
            <SidebarItem
              icon={BarChart3}
              label="แดชบอร์ด"
              id="dashboard"
              active={Pathname === "dashboard"}
            />
            <SidebarItem
              icon={Package}
              label="สินค้า"
              id="inventory"
              active={Pathname === "inventory"}
            />
            <SidebarItem
              icon={ReceiptText}
              label="ใบเสร็จ"
              id="receipt"
              active={Pathname === "receipt"}
            />
            <SidebarItem
              icon={Barcode}
              label="พิมพ์ Barcode"
              id="barcode"
              active={Pathname === "barcode"}
            />
          </div>
        </div>
        <div className="mb-4  pt-4">
          <SidebarItem
            icon={LogOut}
            label="ออก"
            id="logout"
            active={false}
            onClick={() => window.api.app.quit()}
          />
        </div>
      </nav>
    </>
  );
};

export default SideBar;
