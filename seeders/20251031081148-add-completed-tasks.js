"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CompletedTasks",
			[
				//log kan have flere tasks
				{
					logId: 1,
					taskId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					logId: 1,
					taskId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					logId: 2,
					taskId: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					logId: 3,
					taskId: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					logId: 5,
					taskId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CompletedTasks", null, {});
	},
};
