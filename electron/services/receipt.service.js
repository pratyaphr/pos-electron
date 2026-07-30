const {
  receipt: repository,
  products: productRepository,
} = require("../repositories");
const response = require("../utils/response");
const { db } = require("../config/database");

function generateReceiptNo() {
  return "RC-" + Date.now();
}

class ReceiptService {
  create(data) {
    try {
      if (!data.items?.length) {
        throw new Error("Cart is empty");
      }

      const transaction = db.transaction((data) => {
        let total = 0;

        const receiptItems = [];

        for (const item of data.items) {
          const product = productRepository.findById(item.product_id);

          if (!product) {
            throw new Error(`ไม่พบสินค้า${item.product_id}`);
          }

          if (product.stock_qty < item.quantity) {
            throw new Error(`สินค้า ${product.name} ในสต๊อกไม่เพียงพอ`);
          }

          const subtotal = product.price * item.quantity;

          total += subtotal;

          receiptItems.push({
            product_id: product.id,
            product_name: product.name,
            barcode: product.barcode,
            price: product.price,
            quantity: item.quantity,
            subtotal,
          });

          repository.updateStock(
            item.product_id,

            item.quantity,
          );
        }

        const receiptId = repository.createReceipt({
          receipt_no: generateReceiptNo(),

          total_amount: total,

          payment_method: data.payment_method,
        });

        receiptItems.forEach((item) => {
          repository.createReceiptItem({
            receipt_id: receiptId,

            product_id: item.product_id,

            product_name: item.product_name,

            barcode: item.barcode,

            quantity: item.quantity,

            price: item.price,

            subtotal: item.price * item.quantity,
          });
        });

        return repository.findById(receiptId);
      });

      const receipt = transaction(data);

      return response.success(receipt, "Create receipt success");
    } catch (err) {
      return response.error(err.message);
    }
  }

  getAll() {
    return repository.findAll();
  }

  getById(id) {
    try {
      return response.success(repository.findById(id));
    } catch (error) {
      return response.error(err.message);
    }
  }

  async list(query) {
    try {
      return response.success(repository.list(query));
    } catch (err) {
      return response.error(err.message);
    }
  }
}

module.exports = new ReceiptService();
