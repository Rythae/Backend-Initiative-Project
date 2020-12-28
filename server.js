const http = require("http");
const express = require("express");
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

app.use("/", function (req, res) {
  res.send("Welcome!");
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
