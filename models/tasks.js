"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasks.belongsToMany(models.Logs, {
        through: models.CompletedTasks,
        foreignKey: "taskId",
        otherKey: "logId",
        as: "tasks",
      });
    }
  }
  Tasks.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );
  return Tasks;
};
