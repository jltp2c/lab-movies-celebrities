const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

// all your routes here
router.get("/create", function (req, res, next) {
  try {
    res.render("celebrities/new-celebrity");
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  //body = post and query = get

  try {
    const celebrity = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    };
    const createdCelebrity = await Celebrity.create(celebrity);
    console.log(createdCelebrity);
    res.redirect("/celebrities");
  } catch (error) {
    res.redirect("celebrities/new-celebrity");
    next(error);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
