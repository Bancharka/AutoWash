"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Logs.belongsTo(models.Stations, {
        foreignKey: "stationId",
      });
      Logs.belongsTo(models.Users, {
        foreignKey: "userId",
      });
      Logs.belongsToMany(models.Products, {
        through: models.UsedProducts,
        foreignKey: "logId",
        otherKey: "productId",
        as: "logs",
      });
      Logs.hasMany(models.Images, {
        foreignKey: "logId",
      });
      Logs.belongsToMany(models.Tasks, {
        through: models.CompletedTasks,
        foreignKey: "logId",
        otherKey: "taskId",
        as: "logs",
      });
      Logs.hasOne(models.OneTimeLink, {
        foreignKey: "logId",
      });
    }
  }
  Logs.init(
    {
      comment: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      stationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Logs",
    }
  );
  return Logs;
};
