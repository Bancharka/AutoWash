"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Images", [
      {
        id: 1,
        isBefore: true,
        logId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        isBefore: false,
        logId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        isBefore: true,
        logId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        isBefore: false,
        logId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        isBefore: true,
        logId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        isBefore: false,
        logId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        isBefore: true,
        logId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        isBefore: false,
        logId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        isBefore: true,
        logId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        isBefore: false,
        logId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        isBefore: true,
        logId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        isBefore: false,
        logId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        isBefore: true,
        logId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        isBefore: false,
        logId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        isBefore: true,
        logId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        isBefore: false,
        logId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        isBefore: true,
        logId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        isBefore: false,
        logId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        isBefore: true,
        logId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        isBefore: false,
        logId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Images", null, {});
  },
};
