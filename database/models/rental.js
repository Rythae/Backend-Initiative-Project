const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.belongsTo(models.Movie, {
        as: "movie",
        foreignKey: "movieId"
      });
      Rental.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  };
  Rental.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date_collected: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date_returned: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      // movieId: {
      //   allowNull: true,
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: "Rental",
    }
  );
  return Rental;
};