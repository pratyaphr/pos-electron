const { ipcMain } = require("electron");

const createHandler = require("./handler");

const categoryService = require("../services/category.service");

function registerCategoryIPC() {
  ipcMain.handle("categories:getAll", () => {
    return categoryService.getAll();
  });

  ipcMain.handle("categories:getById", (_, id) => {
    return categoryService.getById(id);
  });

  ipcMain.handle("categories:create", (_, name) => {
    return categoryService.create(name);
  });

  ipcMain.handle("categories:update", (_, id, name) => {
    return categoryService.update(id, name);
  });

  ipcMain.handle("categories:delete", (_, id) => {
    return categoryService.delete(id);
  });
}

module.exports = registerCategoryIPC;
