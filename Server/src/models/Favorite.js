const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Alive", "Dead", "Unknown"),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Genderless", "Unknown"),
        allowNull: false,
        // validate:{
        //    isIn: [['Male', 'Female', 'unknown', 'Genderless']],
        // }
      },
      origin: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //    isUrl: true
        // }
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
/*
id
name
status
species
gender
origin
image
*/
