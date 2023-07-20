import "dotenv/config";
import db from "./Database/connection.js";
import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import { errorResponse } from "./helpers/index.js";
// note that I'm leaving out the other things like 'http' or 'path'
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * All Routes Starter Point
 */
app.use("/api", routes); // Mount the combined router under '/api'

/** WIP for error handler if anything breaks */

app.use(errorResponse);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
