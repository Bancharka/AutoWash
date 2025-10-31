"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logs", [
      {
        id: 1,
        stationId: 1,
        comment: "Alt ser fint ud – ingen bemærkninger denne gang.",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        stationId: 1,
        comment: "Lidt ekstra snavs i afløbet – taget hånd om, men bør tjekkes igen næste gang.",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        stationId: 2,
        comment: "En dyse var tilstoppet, men renset. Overvej at udskifte filteret snart.",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        stationId: 2,
        comment: "Der var vand på gulvet ved kontrolpanelet – mulig lækage, hold øje med det.",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        stationId: 3,
        comment: "Oliepletter fjernet, men området er stadig lidt glat – anbefaler ekstra afvaskning.",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        stationId: 3,
        comment: "Sensor ved indkørsel reagerer langsomt – måske snavs på linsen.",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        stationId: 4,
        comment: "Facade og vinduer rengjort, men der er begyndende algevækst i hjørnet ved døren.",
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        stationId: 5,
        comment: "Afløb udenfor var næsten tilstoppet – skal måske renses oftere.",
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        stationId: 5,
        comment: "Alt ok.",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        stationId: 6,
        comment: "...",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logs", null, {});
  },
};
