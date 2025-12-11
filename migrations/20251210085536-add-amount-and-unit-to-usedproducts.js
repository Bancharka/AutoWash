"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("UsedProducts");

    if (!table.amount) {
      await queryInterface.addColumn("UsedProducts", "amount", {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (!table.unitId) {
      await queryInterface.addColumn("UsedProducts", "unitId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Units",
          key: "id",
        },
        onUpdate: "CASCADE",
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("UsedProducts", "unitId");
    await queryInterface.removeColumn("UsedProducts", "amount");
  },
};
