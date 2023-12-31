"use strict";

/*
Examples of add constraints
https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-addConstraint
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Airports", {
      fields: ["cityId"],
      type: "foreign key",
      name: "Airport-City-foreign-key-constraint",
      references: {
        //Required field
        table: "Cities",
        field: "id",s
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint(
      "Airports",
      "Airport-City-foreign-key-constraint"
    );
  },
};
