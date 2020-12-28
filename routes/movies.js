const express = require('express')
const router = express.Router()

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

router.get('/', function (req, res) {
    try {
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', function (req, res) {
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
        res.status(500).send("movie not founc")
  }
})

router.post('/', function (req, res) {
    try {
        let movieIds = movies.map((movie) => movie.id);
        let newId =
          movieIds.length > 0 ? Math.max.apply(Math, movieIds) + 1 : 1;

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
        res.status(500).send("Request failed")
   }
})

router.put('/:id', function (req, res) {
    try {
        let found = movies.find(function (movie) {
          return movie.id === parseInt(req.params.id);
        });

        if (found) {
          let updated = {
            id: found.id,
            title: req.body.title,
            year: req.body.year,
            genre: req.body.genre
          };

          let targetIndex = movies.indexOf(found);

          movies.splice(targetIndex, 1, updated);

          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error)
   }
})

router.delete('/:id', function (req, res) {
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
        res.status(500).send(error)
   }
})

module.exports = router