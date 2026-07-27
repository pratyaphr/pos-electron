const { BrowserWindow } = require("electron");

const receiptRepository = require("../repositories/receipt.repository");
const receiptTemplate = require("../templates/receipt.template");

class PrintService {
  async printReceipt(receiptId, options = {}) {
    const {
      silent = false,
      preview = false,
      printerName = "",
      paperSize = "80mm",
    } = options;

    const size = {
      "58mm": 400,
      "80mm": 500,
      A4: 1000,
    };
    let printWindow = null;

    try {
      console.log("========== PRINT RECEIPT ==========");
      console.log("Receipt ID :", receiptId);

      //-----------------------------------------
      // 1. โหลดข้อมูลใบเสร็จ
      //-----------------------------------------

      const receipt = receiptRepository.findById(receiptId);

      if (!receipt) {
        throw new Error("Receipt not found");
      }

      console.log("Receipt Loaded");

      //-----------------------------------------
      // 2. เพิ่มข้อมูลร้าน
      //-----------------------------------------

      receipt.store_name ??= "หจก.มาวินการเกษตร64";

      receipt.cash ??= receipt.total_amount;

      receipt.change ??= 0;

      //-----------------------------------------
      // 3. Generate HTML
      //-----------------------------------------

      const html = receiptTemplate(receipt, paperSize);

      //-----------------------------------------
      // 4. สร้าง BrowserWindow
      //-----------------------------------------

      printWindow = new BrowserWindow({
        width: size[paperSize],

        height: 900,

        show: false,

        autoHideMenuBar: true,

        webPreferences: {
          sandbox: false,
          contextIsolation: true,
        },
      });

      //-----------------------------------------
      // Debug
      //-----------------------------------------

      printWindow.webContents.on("did-finish-load", () => {
        console.log("HTML Loaded");
      });

      printWindow.webContents.on("did-fail-load", (_, code, description) => {
        console.error("Load Failed :", code, description);
      });

      printWindow.webContents.on("render-process-gone", (_, details) => {
        console.error("Renderer Gone :", details);
      });

      //-----------------------------------------
      // 5. Load HTML
      //-----------------------------------------

      await printWindow.loadURL(
        "data:text/html;charset=utf-8," + encodeURIComponent(html),
      );

      console.log("loadURL success");

      //-----------------------------------------
      // 6. Print
      //-----------------------------------------

      console.log("Calling print...");

      return await new Promise((resolve) => {
        printWindow.webContents.print(
          {
            silent,

            deviceName: printerName || undefined,

            printBackground: true,

            color: false,
          },
          (success, errorType) => {
            console.log("Print Result :", success, errorType);

            if (!preview && !printWindow.isDestroyed()) {
              printWindow.close();
            }

            resolve({
              success,

              message: errorType || "",
            });
          },
        );
      });
    } catch (err) {
      console.error(err);

      if (printWindow && !printWindow.isDestroyed()) {
        printWindow.close();
      }

      return {
        success: false,

        message: err.message,
      };
    }
  }
}

module.exports = new PrintService();
