module.exports = function(sequelize, DataTypes) {

  var Bite = sequelize.define("Bite", {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    preparation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
      {
        timestamps: false,
      });
  return Bite;
};
