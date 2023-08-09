'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
      },
      firstName: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.TEXT,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: Sequelize.DataTypes.TEXT,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.DataTypes.TEXT,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
