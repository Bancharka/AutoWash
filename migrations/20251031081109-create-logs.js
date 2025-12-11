"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Logs", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			stationId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Stations",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			comment: {
				allowNull: true,
				type: Sequelize.TEXT,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			viewToken: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},

			tokenUsed: {
				allowNull: false,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Logs");
	},
};
