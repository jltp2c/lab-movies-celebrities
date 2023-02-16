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
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

// Iteration #8: The Movie Details Page
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const allMoviesFound = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", { allMoviesFound });
  } catch (error) {
    next(error);
  }
});

// Iteration #9: Deleting Movies
router.post("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// Iteration #10: Editing Movies
router.get("/:id/edit", async (req, res, next) => {
  try {
    const oneMovieFound = await Movie.findById(req.params.id);
    let allCelebritiesFound = await Celebrity.find();

    const mappedCelebrities = allCelebritiesFound.map((celeb) => celeb._doc);

    mappedCelebrities.forEach((celeb) => {
      oneMovieFound.cast.forEach((star) => {
        if (celeb._id.equals(star._id)) {
          celeb.isSelected = true;
        }
      });
    });
    res.render("movies/edit-movie", {
      oneMovieFound,
      allCelebritiesFound: mappedCelebrities,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
