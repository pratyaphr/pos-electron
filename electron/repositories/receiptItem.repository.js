const { db } = require("../config/database");

const BaseRepository = require("./base.repository");

class ReceiptItemRepository extends BaseRepository {
  constructor() {
    super(db, "receipt_items");
  }

  create(data) {
    return super.create(data, [
      "receipt_id",
      "product_id",
      "product_name",
      "barcode",
      "price",
      "quantity",
      "subtotal",
    ]);
  }

  findByReceiptId(receiptId) {
    return this.all(
      `
      SELECT *
      FROM receipt_items
      WHERE receipt_id = ?
      ORDER BY id
      `,
      [receiptId],
    );
  }

  deleteByReceiptId(receiptId) {
    return this.run(
      `
      DELETE
      FROM receipt_items
      WHERE receipt_id = ?
      `,
      [receiptId],
    );
  }
}

module.exports = new ReceiptItemRepository();
