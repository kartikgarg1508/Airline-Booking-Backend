const express = require("express");
const app = express();

const { ServerConfig, LoggerConfig } = require("./config");
const apiRoutes = require("./routes");
const { message } = require("./utils/common/success-response");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server started successfully at Port : ${ServerConfig.PORT}`);
  /* NOTE: any { message } property in a meta object provided will automatically be concatenated to any msg already *  provided: For example the below will concatenate ': Test Message' onto 'Successfully started server':
  */
  LoggerConfig.info("Successfully started server", {message: ": Test Message"});
});
