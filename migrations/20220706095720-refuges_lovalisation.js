"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Refuges",
      "localité",
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      "pays",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Refuges");
  },
};
