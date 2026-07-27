module.exports = {
  name: "006_create_stock_movements",

  up(db) {
    db.exec(`

        CREATE TABLE IF NOT EXISTS stock_movements(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            product_id INTEGER NOT NULL,

            movement_type TEXT NOT NULL,

            quantity INTEGER NOT NULL,

            reference TEXT,

            note TEXT,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(product_id)
            REFERENCES products(id)

        );

        CREATE INDEX IF NOT EXISTS idx_stock_product
        ON stock_movements(product_id);

    `);
  },
};
