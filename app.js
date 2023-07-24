import "dotenv/config";
import db from "./Database/connection.js";
import express from "express";
import { router, privateRouter } from "./routes/index.js";
import bodyParser from "body-parser";
import passport from "passport";
import passportHandler from "./Middlewares/authMiddleware/index.js";

// require("./Middlewares/authMiddleware/index.js")(passport);
import { errorResponse } from "./helpers/index.js";
// note that I'm leaving out the other things like 'http' or 'path'
var app = express();
app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * All Routes Starter Point
 */
app.use("/api", router);
app.use(
  "/api",
  passportHandler.authenticate("jwt", { session: false }),
  privateRouter
);
// Mount the combined router under '/api'

/** WIP for error handler if anything breaks */

app.use(errorResponse);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
