const repository = require("../repositories/product.repository");

const response = require("../utils/response");

class ProductService {
  async getAll() {
    try {
      const products = repository.findAll();

      return response.success(products);
    } catch (err) {
      return response.error(err.message);
    }
  }

  async getByBarcode(id) {
    try {
      const product = repository.findByBarcode(id);

      if (!product) {
        return response.error("Product not found");
      }

      return response.success(product);
    } catch (err) {
      return response.error(err.message);
    }
  }

  async getById(id) {
    try {
      const product = repository.findById(id);

      if (!product) {
        return response.error("Product not found");
      }

      return response.success(product);
    } catch (err) {
      return response.error(err.message);
    }
  }

  async search(keyword, categoryId) {
    try {
      const products = repository.search(keyword, categoryId);

      return response.success(products);
    } catch (err) {
      return response.error(err.message);
    }
  }

  async create(data) {
    try {
      const exists = repository.findByBarcode(data.barcode);

      if (exists) {
        return response.error("Barcode นี้มีอยู่แล้ว");
      }

      const product = repository.create(data);

      return response.success(product, "Create product success");
    } catch (err) {
      return response.error(err.message);
    }
  }

  async update(data) {
    try {
      const product = repository.update(data);

      return response.success(product, "Update product success");
    } catch (err) {
      return response.error(err.message);
    }
  }

  async delete(id) {
    try {
      const hasReceipt = repository.hasReceipt(id);

      if (hasReceipt) {
        console.log("softDelete", hasReceipt);

        repository.softDelete(id);

        return response.success(
          null,
          "Product has sales history. Product archived.",
        );
      }
      console.log("hardDelete", hasReceipt);

      repository.hardDelete(id);

      return response.success(null, "Product deleted successfully.");
    } catch (err) {
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

module.exports = new ProductService();
