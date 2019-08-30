var db = require("../models");

module.exports = function(app) {
  // Get all bites
  app.get("/api/bites", function(req, res) {
    db.Bites.findAll({}).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  // Create a new Bite
  app.post("/api/bites", function(req, res) {
    db.Bites.create(req.body).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  // Editing a Bite

  app.put("/api/bites/:id", function(req, res) {
    var body = req.body;

    db.Bites.update(body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBite) {
      res.json(dbBite);
    })
  })

  // Delete a Bite by id
  app.delete("/api/bites/:id", function(req, res) {
    db.Bites.destroy({ where: { id: req.params.id } }).then(function(dbBite) {
      res.json(dbBite);
    });
  });
};
