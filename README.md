# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

```
pos-electron
├─ .oxlintrc.json
├─ electron
│  ├─ config
│  │  ├─ database.js
│  │  └─ pos.db
│  ├─ database
│  │  ├─ migrate.js
│  │  └─ migrations
│  │     ├─ 001_create_categories.js
│  │     ├─ 002_create_products.js
│  │     ├─ 003_create_receipts.js
│  │     ├─ 004_create_receipt_items.js
│  │     ├─ 005_create_settings.js
│  │     ├─ 006_create_stock_movements.js
│  │     └─ 007_seed_default_categories.js
│  ├─ ipc
│  │  ├─ backup.ipc.js
│  │  ├─ category.ipc.js
│  │  ├─ dashboard.ipc.js
│  │  ├─ export.ipc.js
│  │  ├─ handler.js
│  │  ├─ index.js
│  │  ├─ print.ipc.js
│  │  ├─ printer.ipc.js
│  │  ├─ product.ipc.js
│  │  ├─ receipt.ipc.js
│  │  └─ settings.ipc.js
│  ├─ main.js
│  ├─ preload.js
│  ├─ repositories
│  │  ├─ base.repository.js
│  │  ├─ category.repository.js
│  │  ├─ dashboard.repository.js
│  │  ├─ index.js
│  │  ├─ product.repository.js
│  │  ├─ receipt.repository.js
│  │  ├─ receiptItem.repository.js
│  │  └─ settings.repository.js
│  ├─ services
│  │  ├─ backup.service.js
│  │  ├─ category.service.js
│  │  ├─ dashboard.service.js
│  │  ├─ export.service.js
│  │  ├─ print.service.js
│  │  ├─ printer.service.js
│  │  ├─ product.service.js
│  │  ├─ receipt.service.js
│  │  └─ settings.service.js
│  ├─ styles
│  │  └─ receipt.style.js
│  ├─ templates
│  │  ├─ product.page.js
│  │  ├─ product.template.js
│  │  └─ receipt.template.js
│  ├─ test.js
│  └─ utils
│     ├─ AppError.js
│     ├─ barcode.js
│     ├─ format.js
│     ├─ pagination.js
│     └─ response.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ categories.ts
│  │  ├─ dashboard.ts
│  │  ├─ export.ts
│  │  ├─ index.ts
│  │  ├─ print.ts
│  │  ├─ printer.ts
│  │  ├─ products.ts
│  │  └─ receipts.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ CartSidebar.tsx
│  │  ├─ ErrorContent.tsx
│  │  ├─ ExportSelector
│  │  │  ├─ index.tsx
│  │  │  └─ TreeItem.tsx
│  │  ├─ Header.tsx
│  │  ├─ Modal.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductTable.tsx
│  │  ├─ SalesGraph.tsx
│  │  ├─ Sidebar
│  │  │  ├─ index.tsx
│  │  │  └─ SidebarItem.tsx
│  │  ├─ SummaryCard.tsx
│  │  ├─ TableCustom.tsx
│  │  └─ Toast.tsx
│  ├─ core
│  │  ├─ input
│  │  │  ├─ index.ts
│  │  │  ├─ input-mode.manager.ts
│  │  │  └─ input-mode.types.ts
│  │  └─ scanner
│  │     ├─ index.ts
│  │     ├─ scanner.engine.ts
│  │     └─ scanner.types.ts
│  ├─ hooks
│  │  ├─ useAddProduct.ts
│  │  ├─ useCreateCategorie.ts
│  │  ├─ useCreateReceipt.ts
│  │  ├─ useDashboard.ts
│  │  ├─ useDisableProduct.ts
│  │  ├─ useExportProductCatalog.ts
│  │  ├─ useGetCategories.ts
│  │  ├─ useGetProductById.ts
│  │  ├─ useGetReceipt.ts
│  │  ├─ useListReceipts.ts
│  │  ├─ usePrintReceipt.ts
│  │  ├─ useProducts.ts
│  │  ├─ useSearchProduct.ts
│  │  └─ useUpdateProduct.ts
│  ├─ index.css
│  ├─ layouts
│  │  └─ MainLayout.tsx
│  ├─ main.tsx
│  ├─ managers
│  │  └─ KeyboardManager.tsx
│  ├─ pages
│  │  ├─ DashboardPage.tsx
│  │  ├─ InventoryDetailPage.tsx
│  │  ├─ InventoryPage.tsx
│  │  ├─ NotFoundPage.tsx
│  │  ├─ ReceiptDetailPage.tsx
│  │  ├─ ReceiptPage.tsx
│  │  └─ SalePage.tsx
│  ├─ router
│  │  └─ index.tsx
│  ├─ services
│  │  └─ barcode.service.ts
│  ├─ stores
│  │  ├─ cart.store.ts
│  │  ├─ index.ts
│  │  ├─ input-mode.store.ts
│  │  └─ toast.store.ts
│  ├─ types
│  │  ├─ api.ts
│  │  ├─ base.ts
│  │  ├─ categories.ts
│  │  ├─ dashboard.ts
│  │  ├─ electron.d.ts
│  │  ├─ export.ts
│  │  ├─ index.ts
│  │  ├─ product.ts
│  │  └─ receipt.ts
│  └─ utils
│     └─ scanner.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.mts
└─ yarn.lock

```