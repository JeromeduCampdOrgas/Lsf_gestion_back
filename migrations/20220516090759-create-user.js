"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: { allowNull: false, type: Sequelize.STRING },
      prenom: { allowNull: false, type: Sequelize.STRING },
      email: { allowNull: false, type: Sequelize.STRING },
      n_rue: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      rue: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cp: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ville: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tel: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: { allowNull: false, type: Sequelize.STRING, defaultValue: "user" },
      password: { allowNull: false, type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
