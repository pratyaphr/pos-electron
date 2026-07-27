const path = require("path");
const { app } = require("electron");

const isDev = !app.isPackaged;

function root() {
  if (isDev) {
    return path.join(__dirname, "..");
  }

  return path.join(process.resourcesPath, "app.asar", "electron");
}

function resource(...paths) {
  if (isDev) {
    return path.join(root(), ...paths);
  }

  return path.join(process.resourcesPath, ...paths);
}

module.exports = {
  isDev,
  root,
  resource,
};
