'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Todos', 'status', {
        type: Sequelize.BOOLEAN,
      });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Todos', 'status', {
        type: Sequelize.STRING,
      });
  }
};
