'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.DOUBLE,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      generatedBy: {
          type: Sequelize.DOUBLE,
          allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      modified: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleted: {
        type: Sequelize.DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('tokens');
  }
};
