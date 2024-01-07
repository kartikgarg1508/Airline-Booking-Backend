"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "AirplaneDetails",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportCode",
        as: "DepartureAirportDetails",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportCode",
        as: "ArrivalAirportDetails",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Flight.init(
    {
      airlines: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureAirportCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalAirportCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
      totalAvailableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flight",
      indexes: [
        {
          unique: true,
          fields: ["airlines", "flightNumber"],
        },
      ],
    }
  );
  return Flight;
};
