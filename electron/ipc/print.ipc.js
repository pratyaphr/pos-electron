const { ipcMain } = require("electron");

const printService = require("../services/print.service");

function registerPrintIPC() {
  console.log("Register Print IPC");

  ipcMain.handle("print:receipt", async (_, receiptId, options = {}) => {
    console.log("IPC Print", receiptId);
    return await printService.printReceipt(receiptId, options);
  });
}

module.exports = registerPrintIPC;
