"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert(
			"AssignedStations",
			[
				{
					stationId: 1,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					stationId: 2,
					userId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					stationId: 3,
					userId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					stationId: 4,
					userId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					stationId: 5,
					userId: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					stationId: 2,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					stationId: 6,
					userId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("AssignedStations", null, {});
	},
};
