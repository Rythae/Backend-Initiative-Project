const ResponseHelper = require("../utility/ResponseHelper");
const db = require("../db");

const MoviesController = {
  /**
   * Create A Movie
   * @param {object} req 
   * @param {object} res
   * @returns {object} movie object 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
      movies("title", "year", "genre")
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.title,
      req.body.year,
      req.body.genre
    ];

    try {
      const  rows  = await db.query(createQuery, values);
       ResponseHelper.success(res, 201, rows[0]);
    } catch (error) {
       ResponseHelper.error(res, 400, error);
    }
  },
  /**
   * Get All Movies
   * @param {object} req 
   * @param {object} res 
   * @returns {object} movies array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM movies where owner_id = $1';
    try {
      const { rows } = await db.query(findAllQuery, [req.user.id]);
       ResponseHelper.success(res, 200, rows);
    } catch (error) {
      ResponseHelper.error(res, 500, error);
    }
  },
  /**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM movies WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        ResponseHelper.error(res, 404, { message: "movie not found" });
      }
      ResponseHelper.success(res, 200, rows[0]);
    } catch (error) {
      ResponseHelper.error(res, 400, error);
    }
  },
  /**
   * Update A Movie
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated movie
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM movies WHERE id=$1 AND owner_id = $2';
    const updateOneQuery = `UPDATE movies
      SET title=$1,year=$2,genre=$3
      WHERE id=$4 AND owner_id = $5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        ResponseHelper.error(res, 404, { message: "movie not found" });
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.year || rows[0].year,
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      ResponseHelper.success(res, 200, response.rows[0]);
    } catch (error) {
      ResponseHelper.error(res, 400, error);
    }
  },
  /**
   * Delete A Movie
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM movies WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        ResponseHelper.error(res, 404, { message: "movie not found" });
      }
      ResponseHelper.error(res, 204, { message: "deleted" });
    } catch (error) {
      ResponseHelper.error(res, 400, error);
    }
  }
}

module.exports = MoviesController;