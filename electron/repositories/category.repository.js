const { db } = require("../config/database");
const BaseRepository = require("./base.repository");

class CategoryRepository extends BaseRepository {
  constructor() {
    super(db, "categories");
  }

  create(data) {
    return super.create(data, ["name", "active"]);
  }

  update(id, data) {
    return super.update(id, data, ["name", "active"]);
  }

  findByName(name) {
    return this.get(
      `
      SELECT *
      FROM categories
      WHERE name = ?
      `,
      [name],
    );
  }
}

module.exports = new CategoryRepository();
