const { ipcMain } = require("electron");

const createHandler = require("./handler");

const productService = require("../services/product.service");

function registerProductIPC() {
  console.log("Register Product IPC");

  ipcMain.handle("products:getAll", () => {
    return productService.getAll();
  });

  ipcMain.handle("products:getById", (_, id) => {
    return productService.getById(id);
  });

  ipcMain.handle("products:getByBarcode", (_, id) => {
    return productService.getByBarcode(id);
  });

  ipcMain.handle("products:search", (_, keyword) => {
    return productService.search(keyword);
  });

  ipcMain.handle("products:create", (_, data) => {
    return productService.create(data);
  });

  ipcMain.handle("products:update", (_, data) => {
    return productService.update(data);
  });

  ipcMain.handle("products:delete", (_, id) => {
    return productService.delete(id);
  });

  ipcMain.handle("products:list", (_, query) => {
    return productService.list(query);
  });
}

module.exports = registerProductIPC;
