"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Flights",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        airlines: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        flightNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        airplaneId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Airplanes",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        departureAirportCode: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Airports",
            key: "code",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        arrivalAirportCode: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Airports",
            key: "code",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        arrivalTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        departureTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        boardingGate: {
          type: Sequelize.STRING,
        },
        totalAvailableSeats: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          uniqueFlight: {
            fields: ["airlines", "flightNumber"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  },
};
