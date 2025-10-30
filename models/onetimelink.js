"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OneTimeLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stations.belongsTo(models.Logs, {
        foreignKey: "logId",
      });
    }
  }
  OneTimeLink.init(
    {
      logId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OneTimeLink",
    }
  );
  return OneTimeLink;
};
