var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Bite.findAll({}).then(function(dbBites) {
      res.render("okta", {
      });
    });
  });

  app.get("/login", function(req, res) {
    res.render("okta", {
      msg:"Please Sign in to Submit a Bite.",
    })
  });


  app.get("/signup", function(req, res) {
    res.render("okta", {
      msg:" Please Sign up.",
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
