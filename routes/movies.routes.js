const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

//CREATE
router.get("/create", async function (req, res, next) {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const newMovie = req.body;
  console.log(newMovie);
  try {
    const createdMovie = await Movie.create(newMovie);
    console.log(createdMovie);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//READ
