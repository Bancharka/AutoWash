"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Units.hasMany(models.Products, {
        foreignKey: "unitId",
      });
      Units.hasMany(models.UsedProducts, {
        foreignKey: "unitId",
      });

    }
  }
  Units.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Units",
    }
  );
  return Units;
};
