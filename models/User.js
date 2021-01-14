const db = require('../db')


/**
 * export
 */
class User {
  /**
   * Create A User
   * @param {object} data
   * @returns {object} new record
   */
  async create(data) {
    const createQuery = `INSERT INTO
      users("name", "email", "password")
      VALUES($1, $2, $3)
      returning *`;
    const values = [data.name, data.email, data.password];
    try {
      const { rows } = await db.query(createQuery, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * Get All Users
   * @param {object} req
   * @param {object} res
   * @returns {object} users array
   */
  async getAllUsers() {
    const text = "SELECT * FROM users";
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get User by a field
   * @param {String} field - the field
   * @param {String} value - the value
   * @returns {object} record object
   */
  async getByField(field, value) {
    const text = `SELECT * FROM users WHERE "${field}" = $1`;
    try {
      const { rows } = await db.query(text, [value]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
