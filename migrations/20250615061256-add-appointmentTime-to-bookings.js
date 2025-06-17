'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Bookings', 'appointmentTime', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '09:00 AM' // temporary default to avoid null issues
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookings', 'appointmentTime');

  }
};
