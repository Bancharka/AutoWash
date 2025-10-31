"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"UsedProducts",
			[
				{
					//her kan flere produkter bruges flere gange i samme log
					productId: 1,
					logId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 2,
					logId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 2,
					logId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 2,
					logId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 4,
					logId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 7,
					logId: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UsedProducts", null, {});
	},
};
