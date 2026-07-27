import { useNavigate } from "react-router-dom";

type TabType =
  | "sales"
  | "inventory"
  | "staff"
  | "/"
  | "receipt"
  | "login"
  | "dashboard"
  | "barcode";

interface SidebarItemProps {
  icon: any;
  label: string;
  id: TabType | "logout";
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  id,
  active,
  onClick,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        onClick
          ? onClick()
          : id === "logout"
            ? navigate("/")
            : navigate(`/${id}`)
      }
      className={`w-full flex flex-col items-center py-4 cursor-pointer transition-all ${active ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
    >
      <Icon size={24} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );
};

export default SidebarItem;
