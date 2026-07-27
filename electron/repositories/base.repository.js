class BaseRepository {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  get(sql, params = []) {
    return this.db.prepare(sql).get(...params);
  }

  all(sql, params = []) {
    return this.db.prepare(sql).all(...params);
  }

  run(sql, params = []) {
    return this.db.prepare(sql).run(...params);
  }

  transaction(callback) {
    return this.db.transaction(callback);
  }

  findAll() {
    return this.all(`SELECT * FROM ${this.tableName}`);
  }

  findById(id) {
    return this.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  exists(column, value) {
    return !!this.get(
      `SELECT 1 FROM ${this.tableName} WHERE ${column} = ? LIMIT 1`,
      [value],
    );
  }

  create(data, columns) {
    const placeholders = columns.map(() => "?").join(",");

    const sql = `
      INSERT INTO ${this.tableName}
      (${columns.join(",")})
      VALUES (${placeholders})
    `;

    const values = columns.map((c) => data[c]);

    const result = this.run(sql, values);

    return this.findById(result.lastInsertRowid);
  }

  update(id, data, columns) {
    const setClause = columns.map((c) => `${c} = ?`).join(",");

    const sql = `
      UPDATE ${this.tableName}
      SET
        ${setClause},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = columns.map((c) => data[c]);

    this.run(sql, [...values, id]);

    return this.findById(id);
  }

  delete(id) {
    return this.run(`UPDATE ${this.tableName} SET active = 2 WHERE id = ?`, [
      id,
    ]);
  }
}

module.exports = BaseRepository;
