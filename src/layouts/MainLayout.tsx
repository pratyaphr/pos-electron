import type { ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        {children}
      </main>
    </div>
  );
}
