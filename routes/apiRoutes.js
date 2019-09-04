var db = require("../models");

module.exports = function(app) {

  // Get all bites
  app.get("/api/bites", function(req, res) {
    db.Bites.findAll({}).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  //  Search Bites by Title
  app.get("/api/bites/:title", function(req, res) {
    var title = req.params.title;
    db.Bite.findAll({
      where: {
        title: title,
      }
    }).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  // Create a new Bite
  app.post("/api/bites", function(req, res) {
    db.Bites.create(req.body).then(function(dbBites) {
      res.json(dbBites);
    });
  });

};
