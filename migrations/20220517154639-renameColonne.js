"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("chiens", "sexe", "taille");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("chiens", "sexe", "taille");
  },
};
