'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Physicians", [{
                    name: "aninha Teixeira",
                    email: "aninha@hotmail.com",
                    password: "$2y$12$KYm7iiIKnB8KsMWsrYdrx.qfVhkXXeDz/Y90b05no2BFy3NlkaMfe ",
                },
                {
                    name: "isadora Longo",
                    email: "isa@gmail.com",
                    password: "$2y$12$KYm7iiIKnB8KsMWsrYdrx.qfVhkXXeDz/Y90b05no2BFy3NlkaMfe ",
                },
                {
                    name: "Pedro Maia",
                    email: "pedro@hotmail.com",
                    password: "$2y$12$KYm7iiIKnB8KsMWsrYdrx.qfVhkXXeDz/Y90b05no2BFy3NlkaMfe ",
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Phyisicians", null, {});
    }
};