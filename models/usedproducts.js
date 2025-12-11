"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsedProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsedProducts.belongsTo(models.Logs, {
        foreignKey: "logId",
      });
      UsedProducts.belongsTo(models.Products, {
        foreignKey: "productId",
      });
      UsedProducts.belongsTo(models.Units, {
        foreignKey: "unitId",
        as: "unit",
      });
    }
  }
  UsedProducts.init(
    {
      productId: DataTypes.INTEGER,
      logId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      unitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsedProducts",
    }
  );
  return UsedProducts;
};
