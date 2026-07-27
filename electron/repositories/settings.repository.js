const { db } = require("../config/database");

class SettingsRepository {
  get() {
    return db
      .prepare(
        `
        SELECT *

        FROM settings

        WHERE id=1
        `,
      )
      .get();
  }

  save(data) {
    db.prepare(
      `
      INSERT OR REPLACE INTO settings(

          id,

          shop_name,

          phone,

          address,

          tax_no,

          receipt_footer,

          logo

      )

      VALUES(

          1,

          ?,?,?,?,?,?

      )
      `,
    ).run(
      data.shop_name,
      data.phone,
      data.address,
      data.tax_no,
      data.receipt_footer,
      data.logo,
    );

    return this.get();
  }
}

module.exports = new SettingsRepository();
