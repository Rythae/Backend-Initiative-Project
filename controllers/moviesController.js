const ResponseHelper = require("../utility/ResponseHelper");
const Model = require("../database/models")

const { Movie } = Model

const MoviesController = {
  /**
   * Create A Movie
   * @param {object} req
   * @param {object} res
   * @returns {object} movie object
   */
  async create({ body, decoded }, res, next) {
    try {
      const { title, year_of_production, genre } = body;
      const { userId } = decoded;

      const movie = await Movie.create({
        title,
        year_of_production,
        genre,
        userId,
      });
      return ResponseHelper.success(res, 201, movie);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Get All Movies
   * @param {object} req
   * @param {object} res
   * @returns {object} movies array
   */
  async getAll({ decoded }, res) {
    try {
      const myMvies = await Movie.findAll({
        where: { userId: decoded.userId },
      });
      return ResponseHelper.success(res, 200, myMvies);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Get A Movie
   * @param {object} req
   * @param {object} res
   * @returns {object} Movie object
   */
  async getOne({ movie }, res) {
    return ResponseHelper.success(res, 200, movie);
  },
  /**
   * Update A Movie
   * @param {object} req
   * @param {object} res
   * @returns {object} updated movie
   */
  async update({ params: { id }, body }, res) {
    try {
      const { title, year_of_production, genre } = body;

      const updatedMovie = await Movie.update(
        {
          title,
          year_of_production,
          genre,
        },
        { where: { id }, returning: true, plain: true }
      );
      return ResponseHelper.success(res, 200, updatedMovie[1]);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Delete A Movie
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete({ params: { id }, movie }, res) {
    try {
      await Movie.destroy({ where: {id} });
      return ResponseHelper.success(res, 200, movie);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
};

module.exports = MoviesController;