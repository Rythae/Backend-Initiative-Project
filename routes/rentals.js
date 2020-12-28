const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

let movies = [
  {
    id: 1,
    title: "Frozen",
    year: "2018",
    genre: "Animation",
    createdOn: new Date(),
  },
  {
    id: 2,
    title: "Anaconda",
    year: "2005",
    genre: "Horror",
    createdOn: new Date(),
  },
  {
    id: 3,
    title: "Moana",
    year: "2018",
    genre: "Animation",
    createdOn: new Date(),
  },
  {
    id: 4,
    title: "Rio",
    year: "2016",
    genre: "Animation",
    createdOn: new Date(),
  },
  {
    id: 5,
    title: "Shark Tale",
    year: "2014",
    genre: "Animation",
    createdOn: new Date(),
  },
];

router.post("/", verifyToken, (req, res) => {
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
});

router.get("/", function (req, res) {
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', verifyToken, (req, res) => {
    try {
           let found = movies.find(
             (movie) => movie.id === parseInt(req.params.id)
           );
           if (found) {
             res.status(200).json(found);
           } else {
             res.sendStatus(400);
           }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put("/:id", verifyToken, (req, res) => {
  try {
    let found = movies.find((movie) => movie.id === parseInt(req.params.id));
      if (found) {
          let updated = {
              id: found.id,
              title: found.title,
              year: found.year,
              genre: found.genre
          }
          let targetIndex = movies.indexOf(found)
          movies.splice(targetIndex, 1, updated)
      res.sendStatus(204)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", verifyToken, (req, res) => {
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
});


module.exports = router;
