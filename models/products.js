"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Products.belongsTo(models.Units, {
				foreignKey: "unitId",
			});
			Products.belongsToMany(models.Logs, {
				through: models.UsedProducts,
				foreignKey: "productId",
				otherKey: "logId",
				as: "logs",
			});
		}
	}
	Products.init(
		{
			name: DataTypes.STRING,
			unitId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Products",
		}
	);
	return Products;
};
