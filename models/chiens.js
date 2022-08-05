"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chiens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chiens.init(
    {
      nom: DataTypes.STRING,
      naissance: DataTypes.STRING,
      puce: DataTypes.STRING,
      sexe: DataTypes.STRING,
      taille: DataTypes.STRING,
      sante: DataTypes.STRING,
      commentaires: DataTypes.STRING,
      refuge: DataTypes.STRING,
      statut: DataTypes.STRING,
      localisation: DataTypes.STRING,
      department: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chiens",
    }
  );
  return Chiens;
};
