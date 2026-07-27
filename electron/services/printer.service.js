const { BrowserWindow } = require("electron");

class PrinterService {
  async getPrinters() {
    const win = new BrowserWindow({
      show: false,
    });

    const printers = await win.webContents.getPrintersAsync();

    win.destroy();

    return printers;
  }
}

module.exports = new PrinterService();
