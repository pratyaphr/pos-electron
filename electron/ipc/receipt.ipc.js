const { ipcMain } = require("electron");

const receiptService = require("../services/receipt.service");

function registerReceiptIPC() {
  console.log("Register Receipt IPC");

  ipcMain.handle("receipts:create", (_, data) => {
    console.log("api ReceiptIPC");

    return receiptService.create(data);
  });

  ipcMain.handle("receipts:getById", (_, id) => {
    return receiptService.getById(id);
  });

  ipcMain.handle("receipts:list", (_, query) => {
    return receiptService.list(query);
  });

  ipcMain.handle("receipts:delete", (_, id) => {
    return receiptService.delete(id);
  });
}

module.exports = registerReceiptIPC;
