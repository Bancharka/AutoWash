"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Users", [
			{
				firstName: "Alice",
				lastName: "Johnson",
				email: "alice@example.com",
				password: "Password123!",
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Bob",
				lastName: "Smith",
				email: "bob@example.com",
				password: "SecretPass1!",
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Emma",
				lastName: "Larson",
				email: "emma.larson@example.com",
				password: "MyPass2024!",
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Lucas",
				lastName: "Berg",
				email: "lucas.berg@example.com",
				password: "AdminUser22!",
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Mia",
				lastName: "Hansen",
				email: "mia.hansen@example.com",
				password: "Welcome123!",
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
