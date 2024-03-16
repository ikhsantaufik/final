"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init(
    {
      title: DataTypes.STRING,
      date1: DataTypes.TIME,
      date2: DataTypes.TIME,
      description: DataTypes.TEXT,
      reactjs: DataTypes.BOOLEAN,
      nodejs: DataTypes.BOOLEAN,
      java: DataTypes.BOOLEAN,
      javascript: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      author: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return project;
};
