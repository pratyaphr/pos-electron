const { ipcMain, app } = require("electron");

function registerAppIPC() {
  ipcMain.handle("app:quit", async () => {
    app.quit();

    return true;
  });
}

module.exports = registerAppIPC;
