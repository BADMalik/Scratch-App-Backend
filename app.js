import "dotenv/config";
import db from "./Database/connection.js";
import express from "express";
import routes from "./routes/index.js";
// note that I'm leaving out the other things like 'http' or 'path'
var app = express();

app.use("/api", routes); // Mount the combined router under '/api'

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
