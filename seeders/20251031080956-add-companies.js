"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Companies", [
      {
        id: 1,
        name: "Shell",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2, name: "OK", createdAt: new Date(), updatedAt: new Date() },
      {
        id: 3,
        name: "CircleK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "INGO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 5, name: "Q8", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("companies", null, {});
  },
};
