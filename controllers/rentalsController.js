const { movies } = require('../models/Movie')

const createRentalController = (req, res) => {
  try {
    let movieIds = movies.map((movie) => movie.id);
    let newId = movieIds.length > 0 ? Math.max.apply(Math, movieIds) + 1 : 1;
    let rentMovie = {
      id: newId,
      title: req.body.title,
      year: req.body.year,
      genre: req.body.genre,
    };

    movies.push(rentMovie);
    res.status(201).json(rentMovie);
  } catch (error) {
    res.status(500).send("Cannot rent a movie");
  }
};

const getRentalsController = (req, res) => { 
    try {
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).send(error);
    }
}

const getRentalByIdController = (req, res) => {
  try {
    let found = movies.find((movie) => movie.id === parseInt(req.params.id));
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateRentalByIdController = (req, res) => {
  try {
    let found = movies.find((movie) => movie.id === parseInt(req.params.id));
    if (found) {
      let updated = {
        id: found.id,
        title: found.title,
        year: found.year,
        genre: found.genre,
      };
      let targetIndex = movies.indexOf(found);
      movies.splice(targetIndex, 1, updated);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRentalByIdController = (req, res) => {
  try {
    let found = movies.find((movie) => movie.id === parseInt(req.params.id));
    if (found) {
      let targetIndex = movies.indexOf(found);
      movies.splice(targetIndex, 1);
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  createRentalController,
  getRentalsController,
  getRentalByIdController,
  updateRentalByIdController,
  deleteRentalByIdController,
};
