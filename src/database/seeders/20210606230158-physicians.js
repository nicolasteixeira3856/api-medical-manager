'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Physicians",
			[
				{
					name: "aninha Teixeira",
					email: "aninha@hotmail.com",
					password: "secret",
				},
				{
					name: "isadora Longo",
					email: "isa@gmail.com",
					password: "secret",
				},
				{
					name: "Pedro Maia",
					email: "pedro@hotmail.com",
					password: "secret",
				},
			],
			{}
		);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Phyisicians", null, {});
  }
};
