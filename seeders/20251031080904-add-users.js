"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password:
          "$2b$12$IXinPZYDwgwuct1rkfrHpOqP5ggdsFX7eKBrHFJCsVHhAMITjERuu",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        password:
          "$2b$12$pOL0mIrvp2jF07yx7U6R5uKnJY5ymk3y/MiOY/CEs7xpeOMBapEmW",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        firstName: "Emma",
        lastName: "Larson",
        email: "emma.larson@example.com",
        password:
          "$2b$12$EBJgjjdG0k.hK/poRpjEJOkJKaO91xjQK1n1cSQ24Ep.sw3anJupm",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        firstName: "Lucas",
        lastName: "Berg",
        email: "lucas.berg@example.com",
        password:
          "$2b$12$.CYSoYl0fXUoMlSrL7eEyOr32wwfVaeBauitiIjJTyuFEMw4BhlBa",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        firstName: "Mia",
        lastName: "Hansen",
        email: "mia.hansen@example.com",
        password:
          "$2b$12$yqUhsI3BmbkHgTxKFWtRmeqF2fKz8wYjXkjnf04hWYJFfiHQ3ug1m",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
