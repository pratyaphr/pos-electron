const AppError = require("../utils/AppError");

const { category } = require("../repositories");

const response = require("../utils/response");

class CategoryService {
  async getAll() {
    try {
      const categorys = category.findAll();

      return response.success(categorys);
    } catch (err) {
      return response.error(err.message);
    }
  }

  getById(id) {
    const category = category.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }

  create(data) {
    if (!data.name?.trim()) {
      throw new AppError("Category name is required");
    }

    if (category.findByName(data.name)) {
      throw new AppError("Category already exists");
    }

    return category.create(data);
  }

  update(id, data) {
    this.getById(id);

    const duplicate = category.findByName(data.name);

    if (duplicate && duplicate.id !== id) {
      throw new AppError("Category already exists");
    }

    return category.update(id, data);
  }

  delete(id) {
    this.getById(id);

    return category.delete(id);
  }
}

module.exports = new CategoryService();
