/**
 * export
 */
class ResponseHelper {
  /**
   * Create success response
   * @param {Object} res - res object
   * @param {Object} status - req object
   * @param {Object} data - req object
   * @returns {object} data - Json Response
   */
  static success(res, status, data) {
    return res.status(status).json({
      status,
      data,
    });
  }

  /**
   * Create error response
   * @param {Object} res - res object
   * @param {Object} status - req object
   * @param {Object} error - error object
   * @returns {object} data - Json Response
   */
  static error(res, status, error) {
    return res.status(status).json({
      status,
      error,
    });
  }
}

module.exports = ResponseHelper;
