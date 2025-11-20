"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CompletedTasks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			CompletedTasks.belongsTo(models.Logs, {
				foreignKey: "logId",
			});
			CompletedTasks.belongsTo(models.Tasks, {
				foreignKey: "taskId",
			});
		}
	}
	CompletedTasks.init(
		{
			logId: DataTypes.INTEGER,
			taskId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CompletedTasks",
		}
	);
	return CompletedTasks;
};
