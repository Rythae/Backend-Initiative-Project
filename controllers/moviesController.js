const  movies  = require('../models/Movie')

const createMovieController = (req, res) => {
  try {
    let movieIds = movies.map((movie) => movie.id);
    let newId = movieIds.length > 0 ? Math.max.apply(Math, movieIds) + 1 : 1;

    let newItem = {
      id: newId,
      title: req.body.title,
      year: req.body.year,
      genre: req.body.genre,
      createdOn: new Date(),
    };
    movies.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send("Request failed");
  }
};

const getMoviesController = (req, res) => { 
    try {
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).send(error);
    }
}

const getMovieByIdController = (req, res) => {
  try {
    let found = movies.find(function (movie) {
      return movie.id === parseInt(req.params.id);
    });
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send("movie not founc");
  }
};

const updateMovieByIdController = (req, res) => {
  try {
    let found = movies.find(function (movie) {
      return movie.id === parseInt(req.params.id);
    });

    if (found) {
      let updated = {
        id: found.id,
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
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

const deleteMovieByIdController = (req, res) => {
  try {
    let found = movies.find(function (movie) {
      return movie.id === parseInt(req.params.id);
    });

    if (found) {
      let targetIndex = movies.indexOf(found);

      movies.splice(targetIndex, 1);
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  createMovieController,
  getMoviesController,
  getMovieByIdController,
  updateMovieByIdController,
  deleteMovieByIdController,
};
