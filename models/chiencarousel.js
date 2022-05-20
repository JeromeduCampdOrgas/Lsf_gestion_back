'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chiencarousel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chiencarousel.init({
    nom: DataTypes.STRING,
    chienId: DataTypes.INTEGER,
    refuge: DataTypes.STRING,
    images: DataTypes.STRING,
    chienId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chiencarousel',
  });
  return chiencarousel;
};