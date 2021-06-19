'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        { 
          physicianId: 1,
          patientId: 1,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur lacus vitae nisl semper, non vehicula lectus commodo. Vestibulum elementum quam id fermentum interdum. "
        },
        { 
          physicianId: 2,
          patientId: 2,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur lacus vitae nisl semper, non vehicula lectus commodo. Vestibulum elementum quam id fermentum interdum. "
        },
        { 
          physicianId: 3,
          patientId: 2,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur lacus vitae nisl semper, non vehicula lectus commodo. Vestibulum elementum quam id fermentum interdum. "
        },
        { 
          physicianId: 3,
          patientId: 1,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur lacus vitae nisl semper, non vehicula lectus commodo. Vestibulum elementum quam id fermentum interdum. "
        },
        { 
          physicianId: 3,
          patientId: 3,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur lacus vitae nisl semper, non vehicula lectus commodo. Vestibulum elementum quam id fermentum interdum. "
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Appointments", null, {})
  }
};