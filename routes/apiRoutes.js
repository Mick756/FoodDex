var db = require("../models");


module.exports = function(app) {
  // Get all bites
  app.get("/api/bites", function(req, res) {
    db.Bite.findAll({}).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  // Create a new Bite
  app.post("/api/bites", function(req, res) {
    db.Bite.create(req.body).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  app.get("/user/:id", function (req, res) {
    db.User.findAll({ where: { id: req.params.id } }).then(function(user) {
      res.json(user.name);
    });
  });

  // Editing a Bite

  app.put("/api/bites/:id", function(req, res) {
    var body = req.body;

    db.Bite.update(body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBite) {
      res.json(dbBite);
    })
  });

  // Delete a Bite by id
  app.delete("/api/bites/:id", function(req, res) {
    db.Bite.destroy({ where: { id: req.params.id } }).then(function(dbBite) {
      res.json(dbBite);
    });
  });
};
