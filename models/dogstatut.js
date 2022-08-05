'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dogstatut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dogstatut.init({
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dogstatut',
  });
  return Dogstatut;
};