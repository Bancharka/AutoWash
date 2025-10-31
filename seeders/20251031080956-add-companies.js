"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("companies", [
			{ name: "Shell", createdAt: new Date(), updatedAt: new Date() },
			{ name: "OK", createdAt: new Date(), updatedAt: new Date() },
			{ name: "CircleK", createdAt: new Date(), updatedAt: new Date() },
			{ name: "INGO", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Q8", createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("companies", null, {});
	},
};
