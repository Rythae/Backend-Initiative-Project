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
  async create({ body, decoded }, res) {
    try {
      const { title, date_collected, date_returned, status } = body;

      const { userId } = decoded;
      const rental = await Rental.create({
        title,
        date_collected,
        date_returned,
        status,
        userId,
      });
      return ResponseHelper.success(res, 201, rental);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Get All rentals
   * @param {object} req
   * @param {object} res
   * @returns {object} movies array
   */
  async getAll({ decoded }, res) {
    try {
      const myRentals = await Rental.findAll({
        where: { userId: decoded.userId },
      });
      return ResponseHelper.success(res, 200, myRentals);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Get A Rental
   * @param {object} req
   * @param {object} res
   * @returns {object} rental object
   */
  async getOne({ rental }, res) {
    return ResponseHelper.success(res, 200, rental);
  },
  /**
   * Update A Rental
   * @param {object} req
   * @param {object} res
   * @returns {object} updated rental
   */
  async update({ params: { id }, body }, res) {
    try {
      const { title, date_collected, status } = body;
      const updatedRental = await Rental.update(
        {
          title,
          date_collected,
          status,
        },
        {
          where: { id },
          returning: true,
          plain: true,
        }
      );
      return ResponseHelper.success(res, 200, updatedRental[1]);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
  /**
   * Delete A Rental
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 400
   */
  async delete({ params: { id }, rental }, res) {
    try {
      await rental.destroy({ where: { id } });
      return ResponseHelper.success(res, 200, rental);
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  },
};

module.exports = RentalsController;
