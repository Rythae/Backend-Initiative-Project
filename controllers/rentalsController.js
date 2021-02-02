const ResponseHelper = require("../utility/ResponseHelper");
const Model = require("../database/models");

const { Rental } = Model;

const RentalsController = {
  /**
   * Create A Rental
   * @param {object} req
   * @param {object} res
   * @returns {object} movie object
   */
  async create({ body, decoded }, res, next) {
    try {
      const { title, date_collected, date_returned, status, movieId } = body;

      const { userId } = decoded;
      const rental = await Rental.create({
        title,
        date_collected,
        date_returned,
        status,
        userId,
        movieId,
      });
      return ResponseHelper.success(res, 201, rental);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Get All rentals
   * @param {object} req
   * @param {object} res
   * @returns {object} movies array
   */
  async getAll(req, res, next) {
    try {
      const myRentals = await Rental.findAll();
      return ResponseHelper.success(res, 200, myRentals);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Get A Rental
   * @param {object} req
   * @param {object} res
   * @returns {object} rental object
   */
  async getOne({ body }, res, next) {
    try {
      const { movieId } = body;
      const myRental = await Rental.findOne(movieId);
      if (!myRental) {
        return ResponseHelper.error(res, 404, {
          message: "Rental not found",
        });
      }
      return ResponseHelper.success(res, 200, myRental);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Update A Rental
   * @param {object} req
   * @param {object} res
   * @returns {object} updated rental
   */
  async update({ body, decoded }, res, next) {
    try {
      const { movieId } = body;
      const rental = await Rental.findByPk(movieId);
      console.log("movieId", movieId);

      if (!rental) {
        return ResponseHelper.error(res, 400, {
          message: "Wrong movie id",
        });
      }
      const updatedRental = await Rental.update(
        {
          title: body.title || rental.title,
          date_collected: body.date_collected || rental.date_collected,
          date_returned: body.date_returned || rental.date_returned,
          status: body.status || rental.status,
          movieId: body.movieId || rental.movieId,
        },
        {
          where: { id: movieId, userId: decoded.userId },
          returning: true,
          plain: true,
        }
      );
      return ResponseHelper.success(res, 201, updatedRental);
    } catch (error) {
      return next(new Error(error));
    }
  },
  /**
   * Delete A Rental
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 400
   */
  async delete({ body }, res, next) {
    try {
      const { movieId } = body;
      const rental = await Rental.findByPk(movieId);
      if (!rental) {
        return ResponseHelper.error(res, 400, {
          message: "Wrong movie id",
        });
      }
      await rental.destroy();
      return ResponseHelper.success(res, 200, {});
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = RentalsController;
