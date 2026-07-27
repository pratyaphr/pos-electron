const { ipcMain } = require("electron");

const backupService = require("../services/backup.service");

function registerBackupIPC() {
  ipcMain.handle("backup:create", async () => {
    return backupService.backup();
  });

  ipcMain.handle("backup:openFolder", async () => {
    return backupService.openBackupFolder();
  });
}

module.exports = registerBackupIPC;
