"use strict";

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(module.filename);
let env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/../config/config.json")[env];
let db = {};

let sequelize;
// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
  sequelize = new Sequelize("mysql://fgco3g05txa5ocut:r1w2ri3rjlncb66w@uoa25ublaow4obx5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/vff2fhd1nutz0ovm");
// }

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
