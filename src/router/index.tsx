import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import ReceiptPage from "../pages/ReceiptPage";
// import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import SalePage from "../pages/SalePage";

import MainLayout from "../layouts/MainLayout";
import InventoryDetailPage from "../pages/InventoryDetailPage";
import ReceiptDetailPage from "../pages/ReceiptDetailPage";
import Barcode from "../pages/BarCodePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <SalePage />
          </MainLayout>
        }
      />

      <Route
        path="/barcode"
        element={
          <MainLayout>
            <Barcode />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        }
      />

      <Route
        path="/inventory"
        element={
          <MainLayout>
            <InventoryPage />
          </MainLayout>
        }
      />

      <Route
        path="/inventory/:id"
        element={
          <MainLayout>
            <InventoryDetailPage />
          </MainLayout>
        }
      />

      <Route
        path="/receipt"
        element={
          <MainLayout>
            <ReceiptPage />
          </MainLayout>
        }
      />

      <Route
        path="/receipt/:id"
        element={
          <MainLayout>
            <ReceiptDetailPage />
          </MainLayout>
        }
      />

      {/* <Route path="/settings" element={<SettingsPage />} /> */}

      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
