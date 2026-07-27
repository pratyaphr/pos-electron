const { ipcMain } = require("electron");

const exportService = require("../services/export.service");

function registerExportIPC() {
  ipcMain.handle("export:productCatalog", async (_, filter) => {
    return await exportService.exportProductCatalog(filter);
  });
}

module.exports = registerExportIPC;
