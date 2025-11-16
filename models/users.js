"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Users.belongsToMany(models.Stations, {
				through: models.AssignedStations,
				foreignKey: "userId",
				otherKey: "stationId",
				as: "stations",
			});
			Users.hasMany(models.Logs, {
				foreignKey: "userId",
			});
		}
	}
	Users.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Users",
		}
	);
	return Users;
};
