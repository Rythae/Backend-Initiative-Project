const HttpException = require("../utility/HttpException");
const ResponseHelper = require("../utility/ResponseHelper");
const Model = require("../database/models");
const { Movie, Rental } = Model;

/**
 * @export
 */
class VerifyOwner {
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async movie(req, res, next) {
    try {
      const {
        params: { id },
        decoded,
      } = req;
      const movie = await Movie.findOne({
        where: { id, userId: decoded.userId },
      });
      if (!movie) {
        return ResponseHelper.error(res, 404, {
          message: "Movie not found",
        });
      }
      req.movie = movie;
      next();
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  }

  static async rental(req, res, next) {
    try {
      const {
        params: { id },
        decoded,
      } = req;
      const rental = await Rental.findOne({
        where: { id, userId: decoded.userId },
      });
      if (!rental) {
        return ResponseHelper.error(res, 404, {
          message: "Rental not found",
        });
      }
      req.rental = rental;
      next();
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  }
}


module.exports = VerifyOwner;
