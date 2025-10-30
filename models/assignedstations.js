"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignedStations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AssignedStations.belongsTo(models.Stations, {
        foreignKey: "stationId",
      });
      AssignedStations.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }
  AssignedStations.init(
    {
      userId: DataTypes.INTEGER,
      stationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AssignedStations",
    }
  );
  return AssignedStations;
};
