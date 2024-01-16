function acquireRowLockonFlights(flightId) {
  return `SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE;`;
}

module.exports = {
  acquireRowLockonFlights,
};
