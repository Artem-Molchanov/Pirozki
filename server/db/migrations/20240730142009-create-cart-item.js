'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cart_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Carts',
					},
					key: 'id',
				},
				allowNull: false,
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Products',
					},
					key: 'id',
				},
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};