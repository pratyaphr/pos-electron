const fs = require("fs");
const path = require("path");
const { app, dialog, shell } = require("electron");
const { db, dbPath } = require("../config/database");

class BackupService {
  //   getDatabasePath() {
  //     return path.join(app.getPath("userData"), "electron", "config", "pos.db");
  //   }

  getBackupFolder() {
    return path.join(app.getPath("documents"), "POS Backup");
  }

  ensureBackupFolder() {
    const folder = this.getBackupFolder();

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    return folder;
  }

  backup() {
    if (!fs.existsSync(dbPath)) {
      throw new Error("Database not found");
    }

    const backupFolder = this.ensureBackupFolder();

    const destination = path.join(backupFolder, "pos-backup.db");

    db.pragma("wal_checkpoint(FULL)");

    fs.copyFileSync(dbPath, destination);

    return {
      success: true,
      path: destination,
    };
  }

  openBackupFolder() {
    shell.openPath(this.ensureBackupFolder());

    return {
      success: true,
    };
  }
}

module.exports = new BackupService();
