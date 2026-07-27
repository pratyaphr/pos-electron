const registerProductIPC = require("./product.ipc");
const registerCategoryIPC = require("./category.ipc");
const registerSettingsIPC = require("./settings.ipc");
const registerReceiptIPC = require("./receipt.ipc");
const registerDashboardIPC = require("./dashboard.ipc");
const registerPrintIPC = require("./print.ipc");
const registerPrinterIPC = require("./printer.ipc");
const registerExportIPC = require("./export.ipc");
const registerBackupIPC = require("./backup.ipc");
const registerAppIPC = require("./app.ipc");
const registerBarcodeIPC = require("./barcode.ipc");

function registerIPC() {
  console.log("Register ProductIPC...");
  try {
    registerProductIPC();
  } catch (err) {
    console.error("Product IPC ERROR");
    console.error(err);
  }

  console.log("Register CategoryIPC...");
  registerCategoryIPC();

  console.log("Register SettingsIPC...");
  registerSettingsIPC();

  console.log("Register ReceiptIPC...");
  registerReceiptIPC();

  console.log("Register DashboardIPC...");
  registerDashboardIPC();

  console.log("Register PrinterIPC...");
  registerPrinterIPC();

  console.log("Register PrintIPC...");
  registerPrintIPC();

  console.log("Register ExportIPC...");
  registerExportIPC();

  console.log("Register BackupIPC...");
  registerBackupIPC();

  console.log("Register AppIPC...");
  registerAppIPC();

  console.log("Register BarcodeIPC...");
  registerBarcodeIPC();

  console.log("Register IPC Complete");
}

module.exports = registerIPC;
