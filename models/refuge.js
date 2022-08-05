"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Refuge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Refuge.init(
    {
      nom: DataTypes.STRING,
      logo: DataTypes.STRING,
      localite: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Refuge",
    }
  );
  return Refuge;
};
