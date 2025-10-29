'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stations.init({
    address: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stations',
  });
  return Stations;
};