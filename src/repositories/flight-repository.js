const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");
const { Sequelize } = require("sequelize");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");
const { acquireRowLockonFlights } = require("./raw-queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "AirplaneDetails",
          required: true, // for Inner Join
          attributes: ["ModelNumber", "Capacity"],
        },
        {
          model: Airport,
          as: "DepartureAirportDetails",
          required: true,
          attributes: ["name", "code", "address"],
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportCode"),
              "=",
              Sequelize.col("DepartureAirportDetails.code")
            ),
          },
          include: [
            {
              model: City,
              as: "CityDetails",
              required: true,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Airport,
          as: "ArrivalAirportDetails",
          required: true,
          attributes: ["name", "code", "address"],
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportCode"),
              "=",
              Sequelize.col("ArrivalAirportDetails.code")
            ),
          },
          include: [
            {
              model: City,
              as: "CityDetails",
              required: true,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return response;
  }

  async updateAvailableSeats(flightId, noOfSeats, decrease = true) {
    const transaction = await db.sequelize.transaction();
    try {
      const flight = await Flight.findByPk(flightId);

      if (!flight)
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND);

      await db.sequelize.query(acquireRowLockonFlights(flightId));

      if (Number(decrease) === 1) {
        if (flight.totalAvailableSeats >= noOfSeats) {
          await flight.decrement(
            "totalAvailableSeats",
            {
              by: noOfSeats,
            },
            { transaction: transaction }
          );
        } else {
          throw new AppError(
            "Enough Seats not present",
            StatusCodes.BAD_REQUEST
          );
        }
      } else {
        await flight.increment(
          "totalAvailableSeats",
          {
            by: noOfSeats,
          },
          { transaction: transaction }
        );
      }

      await flight.reload();
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
