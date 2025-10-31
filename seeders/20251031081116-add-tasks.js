"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Tasks", [
			{ name: "Tøm affaldsspande", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fej gulv i vaskehal", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Spul gulv rent for snavs og skumrester", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rens afløb og riste", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Aftør vægge og paneler", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fjern olie- og fedtpletter", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør døre og håndtag", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Vask vinduer og spejle", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tør maskiner og udstyr af", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rens børster og dyser", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fjern kalkaflejringer på udstyr", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Kontroller og rengør sensorer", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rens vandfiltre", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør kontrolpaneler og knapper", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tjek og rengør kemikaliebeholdere", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tør slanger og koblinger af", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rens lamper og belysning", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fjern spindelvæv og støv i hjørner", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Vask vægge og lofter for snavs", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør ventilationsgittere", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Polér rustfri overflader", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør personalerum og omklædning", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Vask gulv i teknikrum", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tør hylder og borde af", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør skabe og opbevaringsområder", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Vask vinduer i kontor/opholdsrum", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tjek og rengør afløb udenfor vaskehallen", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rens gummilister og tætninger", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tjek for mug og fjern algevækst", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Spul vægge og lofter grundigt", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fjern kalk og snavs på glaspartier", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Rengør udendørs facade omkring vaskehal", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Ryd op og organiser rengøringsudstyr", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Tjek og rengør alarm- og nødstopsystemer", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Desinficér håndtag og kontaktflader", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Fej og spul område ved ind- og udkørsel", createdAt: new Date(), updatedAt: new Date() },
			{ name: "Kontroller at alt rengøringsudstyr virker", createdAt: new Date(), updatedAt: new Date() },
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Tasks", null, {});
	},
};
