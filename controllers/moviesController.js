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
      return next(new Error(error));
    }
  },
  /**
   * Get All Movies
   * @param {object} req
   * @param {object} res
   * @returns {object} movies array
   */
  async getAll(req, res, next) {
    try {
      const myMvies = await Movie.findAll();
      return ResponseHelper.success(res, 200, myMvies);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Get A Movie
   * @param {object} req
   * @param {object} res
   * @returns {object} Movie object
   */
  async getOne({ body }, res, next) {
    try {
      const { movieId } = body;
      const myMovie = await Movie.findOne(movieId);
      if (!myMovie) {
        return ResponseHelper.error(res, 404, {
          message: "Movie not found",
        });
      }
      return ResponseHelper.success(res, 200, myMovie);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Update A Movie
   * @param {object} req
   * @param {object} res
   * @returns {object} updated movie
   */
  async update({ body }, res, next) {
    try {
      const { movieId } = body;
      const myMovie = await Movie.findOne(movieId);
      if (!myMovie) {
        return ResponseHelper.error(res, 400, {
          message: "Wrong movie id",
        });
      }
      const updatedMovie = await Movie.update(
        {
          title: body.title || myMovie.title,
          year_of_production:
            body.year_of_production || myMovie.year_of_production,
          genre: body.genre || myMovie.genre,
        },
        { where: { id: myMovie.id }, returning: true, plain: true }
      );
      return ResponseHelper.success(res, 201, updatedMovie[1]);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Delete A Movie
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete({ body }, res, next) {
    try {
      const { movieId } = body;
      const movie = await Movie.findOne(movieId);
      if (!movie) {
        return ResponseHelper.error(res, 400, {
          message: "Wrong movie id",
        });
      }
      await movie.destroy();
      return ResponseHelper.success(res, 200, {});
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = MoviesController;