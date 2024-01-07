const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");

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
}

module.exports = FlightRepository;
