const http = require("http");
const express = require("express");
const logger = require('./services/logger')
const bodyParser = require("body-parser");
var cors = require("cors");
const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const rentalsRouter = require("./routes/rentals");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/rentals", rentalsRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Movie APIs" });
});

app.use("*", (req, res) =>
  res.status(404).json({
    message: "Route not found",
  })
);

  // handling all the request errors
app.use((err, req, res, next) => {
    logger.info(err.stack);
    const { statusCode, errorResponse } = err;
  
    // next();
    return res.status(statusCode).json(errorResponse);
  });

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
