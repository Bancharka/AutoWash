"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Products", [
			{
				id: 1,
				name: "Alkalisk gulvrens",
				unitId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Skumrengøringsmiddel",
				unitId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "Glasrens",
				unitId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				name: "Børste",
				unitId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				name: "Affedtningsmiddel",
				unitId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				name: "Microfiberklude",
				unitId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				name: "Gulvskrubbe",
				unitId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				name: "Sæbe til højtryksrenser",
				unitId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 9,
				name: "Kalkfjerner",
				unitId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Products", null, {});
	},
};
