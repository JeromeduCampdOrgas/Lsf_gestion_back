'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chiens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      puce: {
        type: Sequelize.STRING
      },
      sexe: {
        type: Sequelize.STRING
      },
      sexe: {
        type: Sequelize.STRING
      },
      sante: {
        type: Sequelize.STRING
      },
      commentaires: {
        type: Sequelize.STRING
      },
      refuge: {
        type: Sequelize.STRING
      },
      statut: {
        type: Sequelize.STRING
      },
      localisation: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chiens');
  }
};