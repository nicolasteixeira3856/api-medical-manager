'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Patients",
			[
				{
					name: "Nícolas Teixeira",
					email: "nictex@hotmail.com",
					phone: "(41)99940-9678",
				},
				{
					name: "Jackson Longo",
					email: "jlk@gmail.com",
					phone: "(41)99940-4567",
				},
				{
					name: "Gabriel Maia",
					email: "gbmaia@hotmail.com",
					phone: "(41)99970-7867",
				},
				{
					name: "Vitor Obscuro",
					email: "gotico@hotmail.com",
					phone: "(11)99940-1785",
				},
				{
					name: "Felipe",
					email: "felipe@gmail.com",
					phone: "(11)99940-4567",
				},
				{
					name: "Jennifer",
					email: "Jennifer@hotmail.com",
					phone: "(45)99970-1786",
				},
			],
			{}
		);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Patients", null, {});
  }
};
