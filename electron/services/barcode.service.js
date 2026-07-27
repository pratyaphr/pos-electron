const { BrowserWindow } = require("electron");

const barcodeTemplate = require("../templates/barcode.template");

class BarcodeService {
  async print(payload) {
    console.log("BarcodeService", payload);

    const html = barcodeTemplate(payload.products);

    const win = new BrowserWindow({
      width: 900,
      height: 700,
      show: false,
      webPreferences: {
        sandbox: false,
      },
    });

    await win.loadURL(
      "data:text/html;charset=utf-8," + encodeURIComponent(html),
    );

    win.webContents.once("did-finish-load", () => {
      win.webContents.print(
        {
          silent: false, // เปลี่ยนเป็น true ถ้าไม่ต้องการ Preview
          deviceName: payload.printer,
          printBackground: true,
        },
        (success, errorType) => {
          console.log(success, errorType);

          win.close();
        },
      );
    });

    return {
      success: true,
    };
  }
}

module.exports = new BarcodeService();
