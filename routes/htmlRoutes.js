var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Bite.findAll({}).then(function(dbBites) {
      res.render("index", {
        msg: "Welcome!",
        bites: dbBites
      });
    });
  });

  app.get("/login", function(req, res) {
    res.render("login", {
      msg:"Please Sign in to Submit a Bite.",
    })
  });

  // Load example page and pass in an example by id
  app.get("/bite/:id", function(req, res) {
    db.Bite.findOne({ where: { id: req.params.id } }).then(function(dbBite) {
      res.render("bite", {
        bite: dbBite
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
