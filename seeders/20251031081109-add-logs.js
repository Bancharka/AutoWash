"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logs", [
      {
        id: 1,
        stationId: 1,
        comment: "Alt ser fint ud – ingen problemer med udstyr.",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        stationId: 1,
        comment: "Renset børster og fjernet snavs i afløb.",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        stationId: 2,
        comment: "En dyse var tilstoppet, men nu renset.",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        stationId: 2,
        comment: "Gulv spulet og vægge aftørret.",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        stationId: 3,
        comment: "Mindre oliepletter på gulvet – fjernet.",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        stationId: 3,
        comment: "Kontrolleret sensorer og filtre – alt OK.",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        stationId: 4,
        comment: "Facade rengjort og glaspartier pudset.",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        stationId: 5,
        comment: "Afløb udenfor vaskehallen renset.",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        stationId: 5,
        comment: "Alt udstyr kontrolleret – fungerer som det skal.",
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        stationId: 6,
        comment: "Omklædningsrum rengjort og desinficeret.",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logs", null, {});
  },
};
