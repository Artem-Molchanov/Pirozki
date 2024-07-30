'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
			Cart.hasMany(models.CartItem, {
				foreignKey: 'cart_id',
				as: 'cartItems',
			});
			Cart.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'user',
			});
		}
  }
  Cart.init({
    user_id: DataTypes.INTEGER,
    total_sum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};