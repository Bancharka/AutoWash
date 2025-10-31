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
				password: "Password123!",
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				firstName: "Bob",
				lastName: "Smith",
				email: "bob@example.com",
				password: "SecretPass1!",
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				firstName: "Emma",
				lastName: "Larson",
				email: "emma.larson@example.com",
				password: "MyPass2024!",
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				firstName: "Lucas",
				lastName: "Berg",
				email: "lucas.berg@example.com",
				password: "AdminUser22!",
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
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
