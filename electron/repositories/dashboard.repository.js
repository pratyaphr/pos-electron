const BaseRepository = require("./base.repository");
const { db } = require("../config/database");

class DashboardRepository extends BaseRepository {
  getSummary() {
    return db
      .prepare(
        `
        SELECT

            IFNULL((
                SELECT SUM(total_amount)
                FROM receipts
                WHERE DATE(created_at)=DATE('now','localtime')
            ),0) AS todaySale,

            (
                SELECT COUNT(*)
                FROM receipts
                WHERE DATE(created_at)=DATE('now','localtime')
            ) AS todayReceipt,

            IFNULL((
                SELECT SUM(quantity)
                FROM receipt_items ri
                JOIN receipts r
                    ON r.id = ri.receipt_id
                WHERE DATE(r.created_at)=DATE('now','localtime')
            ),0) AS todayQty,

            (
                SELECT COUNT(*)
                FROM products
                WHERE active = 1
            ) AS productCount
    `,
      )
      .get();
  }

  getSales7Days() {
    return db
      .prepare(
        `
        SELECT

            DATE(created_at) date,

            SUM(total_amount) total

        FROM receipts

        WHERE created_at >= DATE('now','-6 day')

        GROUP BY DATE(created_at)

        ORDER BY DATE(created_at)
    `,
      )
      .all();
  }

  getTopProducts() {
    return db
      .prepare(
        `
        SELECT

            p.id,

            p.name,

            SUM(ri.quantity) qty

        FROM receipt_items ri

        JOIN products p
            ON p.id = ri.product_id

        GROUP BY p.id

        ORDER BY qty DESC

        LIMIT 10
    `,
      )
      .all();
  }

  getLowStock() {
    return db
      .prepare(
        `
    SELECT
        id,
        name,
        price,
        stock_qty
    FROM products
    WHERE active = 1
    ORDER BY stock_qty ASC, id ASC
    LIMIT 10
`,
      )
      .all();
  }

  getRecentReceipts() {
    return db
      .prepare(
        `
        SELECT

            id,

            receipt_no,

            total_amount,

            payment_method,

            created_at

        FROM receipts

        ORDER BY id DESC

        LIMIT 10
    `,
      )
      .all();
  }

  getPaymentSummary() {
    return db
      .prepare(
        `
        SELECT

            payment_method,

            SUM(total_amount) total

        FROM receipts

        WHERE DATE(created_at)=DATE('now','localtime')

        GROUP BY payment_method
    `,
      )
      .all();
  }
}

module.exports = new DashboardRepository();
