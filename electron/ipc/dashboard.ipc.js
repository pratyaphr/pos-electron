const { ipcMain } = require("electron");

const dashboardService = require("../services/dashboard.service");

function registerDashboardIPC() {
  console.log("Register Dashboard IPC");

  ipcMain.handle("dashboard:get", () => {
    return dashboardService.get();
  });
}

module.exports = registerDashboardIPC;
