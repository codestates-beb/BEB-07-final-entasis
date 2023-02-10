'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class position_his extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      position_his.belongsTo(models.users, { foreignKey: 'user_wallet', sourceKey: 'wallet' });
    }
  }
  position_his.init({
    user_wallet: DataTypes.STRING,
    order: DataTypes.STRING,
    price: DataTypes.STRING,
    amount: DataTypes.STRING,
    fee: DataTypes.STRING,
    vote: DataTypes.STRING,
    token_name: DataTypes.STRING,
    txin: DataTypes.STRING,
    txout: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'position_his',
  });
  return position_his;
};