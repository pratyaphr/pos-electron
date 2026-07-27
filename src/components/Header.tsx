// import { useAuthStore } from "@/stores/useAuthStore";

const Header = () => {
  // const { auth } = useAuthStore();

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-300/40 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-xl tracking-tight">POS System</h3>
        </div>

        {/* <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-slate-800">
              {auth?.user?.name}
            </p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold">
              {auth?.user?.role}
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-xl border-2 border-white shadow-sm flex items-center justify-center text-slate-500 ">
            <Users size={20} />
          </div>
        </div> */}
      </header>
    </>
  );
};

export default Header;
