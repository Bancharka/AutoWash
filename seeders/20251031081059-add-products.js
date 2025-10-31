'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Alkalisk gulvrens",
        unitId: 1, // Liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Skumrengøringsmiddel",
        unitId: 2, // Milliliter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Glasrens",
        unitId: 1, // Liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Børste",
        unitId: 3, // Styk
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Affedtningsmiddel",
        unitId: 1, // Liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Microfiberklude",
        unitId: 3, // Styk
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gulvskrubbe",
        unitId: 3, // Styk
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sæbe til højtryksrenser",
        unitId: 1, // Liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kalkfjerner",
        unitId: 1, // Liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};