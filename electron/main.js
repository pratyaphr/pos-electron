const { app, BrowserWindow } = require("electron");
const backupService = require("./services/backup.service");

const path = require("path");
const registerIPC = require("./ipc");
const migrate = require("./database/migrate");
const { isDev } = require("./utils/paths");

let isQuitting = false;

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    // width: 1400,

    // height: 900,

    autoHideMenuBar: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),

      contextIsolation: true,

      nodeIntegration: false,
      devTools: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(async () => {
  await migrate();

  registerIPC();

  createWindow();
});

app.on("before-quit", (event) => {
  if (isQuitting) return;

  event.preventDefault();

  isQuitting = true;

  try {
    console.log("Auto Backup Database...");

    backupService.backup();

    console.log("Backup Success");
  } catch (err) {
    console.error("Backup Error", err);
  }

  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});
