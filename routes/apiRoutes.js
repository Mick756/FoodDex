var db = require("../models");
let Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {

  // Get all bites
  app.get("/api/bites", function(req, res) {
    db.Bite.findAll({}).then(function(dbBites) {
      res.json(dbBites);
    });
  });

  //  Search Bites by Title
  app.get("/search/bites/:title", function(req, res) {
    var title = req.params.title;
    db.Bite.findAll({
      where: {
        title: {
          [Op.like]: "%" + title + "%"
        },
      }
    }).then(function(dbBites) {
      res.render("index", {
        bites: dbBites
      });
    });
  });

  // Create a new Bite
  app.post("/api/bites", function(req, res) {
    db.Bite.create(req.body).then(function(dbBites) {
      res.json(dbBites);
    });
  });
};
