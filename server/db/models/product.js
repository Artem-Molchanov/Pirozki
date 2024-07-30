'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.CartItem, {
				foreignKey: 'product_id',
				as: 'cartItems',
			});
    }
  }
  Product.init({
    product_name: DataTypes.STRING,
    product_description: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};