const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

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
    try {
      const flight = await Flight.findByPk(flightId);

      if (!flight)
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND);

      if (Number(decrease) === 1) {
        if (flight.totalAvailableSeats >= noOfSeats) {
          await flight.decrement("totalAvailableSeats", {
            by: noOfSeats,
          });
        } else {
          throw new AppError(
            "Enough Seats not present",
            StatusCodes.BAD_REQUEST
          );
        }
      } else {
        await flight.increment("totalAvailableSeats", {
          by: noOfSeats,
        });
      }

      await flight.reload();
      return flight;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FlightRepository;
