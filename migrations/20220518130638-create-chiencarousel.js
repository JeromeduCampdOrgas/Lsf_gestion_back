"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "chiencarousels",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nom: {
          type: Sequelize.STRING,
        },
        chienId: {
          type: Sequelize.INTEGER,
        },
        refuge: {
          type: Sequelize.STRING,
        },
        images: {
          type: Sequelize.STRING,
        },
        chienId: {
          type: Sequelize.INTEGER,
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
            models.Chien.belongsTo(models.Chiens, {
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
    await queryInterface.dropTable("chiencarousels");
  },
};
