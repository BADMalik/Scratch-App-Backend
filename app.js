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
app.use(passport.session());
// app.use(flash());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

/**
 * WHAT DOES SERIALIZE USER MEAN?
  1. "express-session" creates a "req.session" object, when it is invoked via app.use(session({..}))
  2. "passport" then adds an additional object "req.session.passport" to this "req.session".
  3. All the serializeUser() function does is,
  receives the "authenticated user" object from the "Strategy" framework, and attach the authenticated user to "req.session.passport.user.{..}"
  In above case we receive {id: 123, name: "Kyle"} from the done() in the authUser function in the Strategy framework, 
  so this will be attached as 
  req.session.passport.user.{id: 123, name: "Kyle"}

  3. So in effect during "serializeUser", the PassportJS library adds the authenticated user to end of the "req.session.passport" object.
  This is what is meant by serialization.
  This allows the authenticated user to be "attached" to a unique session. 
  This is why PassportJS library is used, as it abstracts this away and directly maintains authenticated users for each session within the "req.session.passport.user.{..}"
 */

/**
   * WHAT DOES DE SERIALIZE USER MEAN?
  1. Passport JS conveniently populates the "userObj" value in the deserializeUser() with the object attached at the end of "req.session.passport.user.{..}"
  2. When the done (null, user) function is called in the deserializeUser(), Passport JS takes this last object attached to "req.session.passport.user.{..}", and attaches it to "req.user" i.e "req.user.{..}"
  In our case, since after calling the done() in "serializeUser" we had req.session.passport.user.{id: 123, name: "Kyle"}, 
  calling the done() in the "deserializeUser" will take that last object that was attached to req.session.passport.user.{..} and attach to req.user.{..} 
  i.e. req.user.{id: 123, name: "Kyle"}
  3. So "req.user" will contain the authenticated user object for that session, and you can use it in any of the routes in the Node JS app. 
  eg. 
  app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", {name: req.user.name})
  })
   */

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
