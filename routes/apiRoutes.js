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

  // Delete a Bite by id
  app.delete("/api/bites/:id", function(req, res) {
    db.Bites.destroy({ where: { id: req.params.id } }).then(function(dbBite) {
      res.json(dbBite);
    });
  });
};
