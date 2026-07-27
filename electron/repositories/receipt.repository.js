const { db } = require("../config/database");

const BaseRepository = require("./base.repository");

class ReceiptRepository extends BaseRepository {
  constructor() {
    super(db, "receipts");
  }

  createReceipt(data) {
    const stmt = this.db.prepare(`
        INSERT INTO receipts(
            receipt_no,
            total_amount,
            payment_method
        )
        VALUES(
            @receipt_no,
            @total_amount,
            @payment_method
        )
    `);

    const result = stmt.run(data);

    return result.lastInsertRowid;
  }

  createReceiptItem(item) {
    return this.db
      .prepare(
        `
        INSERT INTO receipt_items(

            receipt_id,

            product_id,

            product_name,
            
            barcode,

            quantity,

            price,

            subtotal

        )
        VALUES(

            @receipt_id,

            @product_id,

            @product_name,

            @barcode,

            @quantity,

            @price,

            @subtotal

        )
    `,
      )
      .run(item);
  }

  updateStock(product_id, quantity) {
    return this.db
      .prepare(
        `
        UPDATE products
        SET stock_qty = stock_qty - ?
        WHERE id = ?
    `,
      )
      .run(quantity, product_id);
  }

  findById(id) {
    const receipt = this.db
      .prepare(
        `
      SELECT *
      FROM receipts
      WHERE id = ?
    `,
      )
      .get(id);

    if (!receipt) {
      return null;
    }

    const items = this.db
      .prepare(
        `
      SELECT
        ri.id,
        ri.receipt_id,
        ri.product_id,
        ri.quantity,
        ri.price,
        ri.subtotal,

        p.name,
        p.barcode

      FROM receipt_items ri

      LEFT JOIN products p
        ON p.id = ri.product_id

      WHERE ri.receipt_id = ?

      ORDER BY ri.id
    `,
      )
      .all(id);

    receipt.items = items;

    return receipt;
  }

  findItems(receipt_id) {
    return this.db
      .prepare(
        `
        SELECT

            ri.*,

            p.name,

            p.barcode

        FROM receipt_items ri

        LEFT JOIN products p

            ON p.id = ri.product_id

        WHERE receipt_id = ?

    `,
      )
      .all(receipt_id);
  }

  list({ page = 1, pageSize = 10, keyword = "" }) {
    const offset = (page - 1) * pageSize;

    const where = keyword ? "WHERE receipt_no LIKE ?" : "";

    const params = keyword
      ? [`%${keyword}%`, pageSize, offset]
      : [pageSize, offset];

    const items = db
      .prepare(
        `
        SELECT *
        FROM receipts
        ${where}
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    `,
      )
      .all(...params);

    const countParams = keyword ? [`%${keyword}%`] : [];

    const total = db
      .prepare(
        `
        SELECT COUNT(*) total
        FROM receipts
        ${where}
    `,
      )
      .get(...countParams).total;

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };

    // const data = this.db
    //   .prepare(
    //     `
    //     SELECT *

    //     FROM receipts

    //     ORDER BY id DESC

    //     LIMIT ?

    //     OFFSET ?
    // `,
    //   )
    //   .all(limit, offset);

    // const total = this.db
    //   .prepare(
    //     `
    //         SELECT COUNT(*) total
    //         FROM receipts
    //     `,
    //   )
    //   .get().total;

    // return {
    //   data,

    //   total,
    // };
  }

  delete(id) {
    this.db
      .prepare(
        `
        DELETE
        FROM receipt_items
        WHERE receipt_id=?
    `,
      )
      .run(id);

    this.db
      .prepare(
        `
        DELETE
        FROM receipts
        WHERE id=?
    `,
      )
      .run(id);
  }

  create(data) {
    return super.create(data, ["receipt_no", "total_amount", "payment_method"]);
  }

  update(id, data) {
    return super.update(id, data, [
      "receipt_no",
      "total_amount",
      "payment_method",
    ]);
  }

  findByReceiptNo(receiptNo) {
    return this.get(
      `
      SELECT *
      FROM receipts
      WHERE receipt_no = ?
      `,
      [receiptNo],
    );
  }
}

module.exports = new ReceiptRepository();
