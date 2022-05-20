"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("chiens", "sexe", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("chiens", "sexe", Sequelize.STRING);
  },
};
