"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        name: "Tøm affaldsspande",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Fej gulv i vaskehal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Spul gulv rent for snavs og skumrester",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Rens afløb og riste",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Aftør vægge og paneler",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Fjern olie- og fedtpletter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Rengør døre og håndtag",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Vask vinduer og spejle",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Tør maskiner og udstyr af",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Rens børster og dyser",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Fjern kalkaflejringer på udstyr",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "Kontroller og rengør sensorer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Rens vandfiltre",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Rengør kontrolpaneler og knapper",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Tjek og rengør kemikaliebeholdere",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Tør slanger og koblinger af",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "Rens lamper og belysning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Fjern spindelvæv og støv i hjørner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "Vask vægge og lofter for snavs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "Rengør ventilationsgittere",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "Polér rustfri overflader",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "Rengør personalerum og omklædning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "Vask gulv i teknikrum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "Tør hylder og borde af",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        name: "Rengør skabe og opbevaringsområder",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        name: "Vask vinduer i kontor/opholdsrum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        name: "Tjek og rengør afløb udenfor vaskehallen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        name: "Rens gummilister og tætninger",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        name: "Tjek for mug og fjern algevækst",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        name: "Spul vægge og lofter grundigt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: "Fjern kalk og snavs på glaspartier",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        name: "Rengør udendørs facade omkring vaskehal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        name: "Ryd op og organiser rengøringsudstyr",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        name: "Tjek og rengør alarm- og nødstopsystemer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 35,
        name: "Desinficér håndtag og kontaktflader",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 36,
        name: "Fej og spul område ved ind- og udkørsel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 37,
        name: "Kontroller at alt rengøringsudstyr virker",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
