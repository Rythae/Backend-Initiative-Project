const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      Movie.hasMany(models.Rental, {
        as: "movie",
        foreignKey: "movieId",
      });
    }
  };
  Movie.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      year_of_production: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      genre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};