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
		await queryInterface.bulkInsert("stations", [
			{
				address: "Hovedgaden 12",
				postalCode: "2750",
				city: "Ballerup",
				companyId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Søndergade 44",
				postalCode: "8700",
				city: "Horsens",
				companyId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Nørrevænget 9",
				postalCode: "7100",
				city: "Vejle",
				companyId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Strandvejen 201",
				postalCode: "2100",
				city: "København Ø",
				companyId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Vesterbro 31",
				postalCode: "5000",
				city: "Odense C",
				companyId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Stationsvej 2",
				postalCode: "4000",
				city: "Roskilde",
				companyId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Vestergade 89",
				postalCode: "8000",
				city: "Aarhus C",
				companyId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Jyllingevej 178",
				postalCode: "2720",
				city: "Vanløse",
				companyId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Algade 23",
				postalCode: "4000",
				city: "Roskilde",
				companyId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				address: "Torvet 6",
				postalCode: "6400",
				city: "Sønderborg",
				companyId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete("stations", null, {});
	},
};
