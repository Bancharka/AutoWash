"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logs", [
      {
        stationId: 1,
        comment: "Alt ser fint ud – ingen problemer med udstyr.",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 1,
        comment: "Renset børster og fjernet snavs i afløb.",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 2,
        comment: "En dyse var tilstoppet, men nu renset.",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 2,
        comment: "Gulv spulet og vægge aftørret.",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 3,
        comment: "Mindre oliepletter på gulvet – fjernet.",
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 3,
        comment: "Kontrolleret sensorer og filtre – alt OK.",
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 4,
        comment: "Facade rengjort og glaspartier pudset.",
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 5,
        comment: "Afløb udenfor vaskehallen renset.",
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stationId: 5,
        comment: "Alt udstyr kontrolleret – fungerer som det skal.",
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
