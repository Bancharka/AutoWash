"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stations.belongsTo(models.Companies, {
        foreignKey: "companyId",
        as: "companies",
      });
      Stations.belongsToMany(models.Users, {
        through: models.AssignedStations,
        foreignKey: "stationId",
        otherKey: "userId",
        as: "users",
      });
      Stations.hasMany(models.Logs, {
        foreignKey: "stationId",
      });
    }
  }
  Stations.init(
    {
      address: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      city: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stations",
    }
  );
  return Stations;
};
