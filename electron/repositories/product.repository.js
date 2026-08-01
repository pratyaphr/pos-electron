const { db } = require("../config/database");

const BaseRepository = require("./base.repository");

class ProductRepository extends BaseRepository {
  constructor() {
    super(db, "products");
  }

  create(data) {
    console.log("create", data);

    return super.create(data, [
      "category_id",
      "barcode",
      "name",
      "cost",
      "price",
      "stock_qty",
      "active",
    ]);
  }

  findById(id) {
    return this.db
      .prepare(
        `
      SELECT *
      FROM products
      WHERE id = ?
    `,
      )
      .get(id);
  }

  update(data) {
    return super.update(data.id, data, [
      "category_id",
      "barcode",
      "name",
      "cost",
      "price",
      "stock_qty",
      "active",
    ]);
  }

  findByBarcode(barcode) {
    return this.get(
      `SELECT  *
            FROM products
            WHERE active = 1 AND barcode = ?
            LIMIT 1`,
      [barcode],
    );
  }

  search(keyword, categoryId = null) {
    const params = [`%${keyword}%`, `%${keyword}%`];

    let sql = `
    SELECT
      p.*,
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c
      ON p.category_id = c.id
    WHERE
      p.active = 1
      AND (
        p.barcode LIKE ?
        OR p.name LIKE ?
      )
  `;

    if (categoryId !== null) {
      sql += ` AND p.category_id = ?`;
      params.push(categoryId);
    }

    sql += `
    ORDER BY p.created_at
  `;

    return this.all(sql, params);
  }

  list({ page = 1, pageSize = 10, keyword = "" }) {
    const offset = (page - 1) * pageSize;

    const where = keyword ? "WHERE name LIKE ? OR barcode LIKE ?" : "";

    const params = keyword
      ? [`%${keyword}%`, `%${keyword}%`, pageSize, offset]
      : [pageSize, offset];

    const items = db
      .prepare(
        `
        SELECT
      p.*,
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c
      ON p.category_id = c.id
        ${where}
        ORDER BY active ASC, id DESC
        LIMIT ?
        OFFSET ?
    `,
      )
      .all(...params);

    const countParams = keyword ? [`%${keyword}%`, `%${keyword}%`] : [];

    const total = db
      .prepare(
        `
        SELECT COUNT(*) total
        FROM products
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
  }

  hasReceipt(productId) {
    const result = this.db
      .prepare(
        `
      SELECT COUNT(*) AS total
      FROM receipt_items
      WHERE product_id = ?
    `,
      )
      .get(productId);

    return result.total > 0;
  }

  softDelete(id) {
    return this.db
      .prepare(
        `
      UPDATE products
      SET active = 2
      WHERE id = ?
    `,
      )
      .run(id);
  }

  hardDelete(id) {
    return this.db
      .prepare(
        `
      DELETE FROM products
      WHERE id = ?
    `,
      )
      .run(id);
  }

  findAllForExport(filter = {}) {
    const { categoryId = null, sortCreatedAt = "DESC" } = filter;

    let sql = `
        SELECT

            p.id,

            p.barcode,

            p.name,

            c.name AS category,

            p.price,

            p.stock_qty,

            p.created_at

        FROM products p

        LEFT JOIN categories c

            ON c.id = p.category_id

        WHERE p.active = 1
    `;

    const params = [];

    if (categoryId) {
      sql += `

            AND p.category_id = ?

        `;

      params.push(categoryId);
    }

    sql += `

        ORDER BY p.category_id ASC,p.created_at ${sortCreatedAt}

    `;

    return db.prepare(sql).all(...params);
  }
}

module.exports = new ProductRepository();
