const { ipcMain } = require("electron");

const printerService = require("../services/printer.service");

function registerPrinterIPC() {
  ipcMain.handle("printer:getAll", async () => {
    return printerService.getPrinters();
  });
}

module.exports = registerPrinterIPC;
