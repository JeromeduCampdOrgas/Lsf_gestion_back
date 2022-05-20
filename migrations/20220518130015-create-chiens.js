"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Chiens",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nom: { allowNull: false, type: Sequelize.STRING },
        puce: { allowNull: false, type: Sequelize.STRING },
        sexe: { allowNull: false, type: Sequelize.STRING },
        taille: {
          type: Sequelize.STRING,
        },
        sante: { allowNull: false, type: Sequelize.STRING },
        commentaires: {
          type: Sequelize.STRING,
        },
        refuge: {
          type: Sequelize.STRING,
        },
        statut: { allowNull: false, type: Sequelize.STRING },
        localisation: { allowNull: false, type: Sequelize.STRING },
        imageUrl: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        classMethods: {
          associate: function (models) {
            // associations can be defined here
            models.Chien.hasMany(models.chiencarousel, {
              foreignKey: "chienId",
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
              hooks: true,
            });
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Chiens");
  },
};
