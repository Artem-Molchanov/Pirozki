'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
        CartItem.belongsTo(models.Cart, {
					foreignKey: 'cart_id',
					as: 'cart',
				});
				CartItem.belongsTo(models.Product, {
					foreignKey: 'product_id',
					as: 'product',
				});
    }
  }
  CartItem.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};