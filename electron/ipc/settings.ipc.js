const { ipcMain } = require("electron");

const settingsService = require("../services/settings.service");

function registerSettingsIPC() {
  ipcMain.handle("settings:get", () => {
    return settingsService.get();
  });

  ipcMain.handle("settings:save", (_, data) => {
    return settingsService.save(data);
  });
}

module.exports = registerSettingsIPC;
