const { ipcMain } = require("electron");

const barcodeService = require("../services/barcode.service");

function registerBarcodeIPC() {
  ipcMain.handle("barcode:print", async (_, payload) => {
    console.log("registerBarcodeIPC", payload);

    return barcodeService.print(payload);
  });
}

module.exports = registerBarcodeIPC;
