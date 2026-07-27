const { BrowserWindow, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

const productRepository = require("../repositories/product.repository");
const productTemplate = require("../templates/product.template");

class ExportService {
  async exportProductCatalog(filter = {}) {
    let win = null;

    try {
      //------------------------------------------
      // 1. โหลดข้อมูลสินค้า
      //------------------------------------------

      const products = productRepository.findAllForExport(filter);

      if (!products.length) {
        throw new Error("No products");
      }

      //------------------------------------------
      // 2. Generate HTML
      //------------------------------------------

      const html = productTemplate(products);

      //------------------------------------------
      // 3. Save Dialog
      //------------------------------------------

      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Export Product Catalog",

        defaultPath: path.join(
          process.cwd(),
          `Product-Catalog-${Date.now()}.pdf`,
        ),

        filters: [
          {
            name: "PDF",

            extensions: ["pdf"],
          },
        ],
      });

      if (canceled) {
        return {
          success: false,
          message: "Cancel",
        };
      }

      //------------------------------------------
      // 4. BrowserWindow
      //------------------------------------------

      win = new BrowserWindow({
        show: false,

        webPreferences: {
          sandbox: false,
        },
      });

      //------------------------------------------
      // 5. Load HTML
      //------------------------------------------

      await win.loadURL(
        "data:text/html;charset=utf-8," + encodeURIComponent(html),
      );

      //------------------------------------------
      // 6. Generate PDF
      //------------------------------------------

      const pdf = await win.webContents.printToPDF({
        landscape: false,

        printBackground: true,

        pageSize: "A4",

        preferCSSPageSize: true,

        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      });

      //------------------------------------------
      // 7. Save
      //------------------------------------------

      fs.writeFileSync(filePath, pdf);

      win.destroy();

      return {
        success: true,

        filePath,
      };
    } catch (err) {
      console.error(err);

      if (win && !win.isDestroyed()) {
        win.destroy();
      }

      return {
        success: false,

        message: err.message,
      };
    }
  }
}

module.exports = new ExportService();
