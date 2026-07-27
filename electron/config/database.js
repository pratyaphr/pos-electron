const Database = require("better-sqlite3");
const path = require("path");
const { isDev } = require("../utils/paths");
const fs = require("fs");

const { app } = require("electron");

// const databaseDir = path.join(app.getPath("userData"), "database");

// if (!fs.existsSync(databaseDir)) {
//   fs.mkdirSync(databaseDir, {
//     recursive: true,
//   });
// }

// const dbPath = path.join(databaseDir, "pos.db");

let dbPath;

if (isDev) {
  dbPath = path.join(__dirname, "..", "database", "pos.db");
} else {
  const userDatabaseDir = path.join(app.getPath("userData"), "database");

  if (!fs.existsSync(userDatabaseDir)) {
    fs.mkdirSync(userDatabaseDir, { recursive: true });
  }

  dbPath = path.join(userDatabaseDir, "pos.db");
}

console.log("userData Dir", path.join(app.getPath("userData"), "database"));

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

module.exports = {
  db,
  dbPath,
};
