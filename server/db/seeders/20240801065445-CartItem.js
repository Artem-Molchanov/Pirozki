'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'CartItems',
			[
				{
					cart_id: 1,
					product_id: 1,
					quantity: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					cart_id: 2,
					product_id: 2,
					quantity: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					cart_id: 2,
					product_id: 3,
					quantity: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('CartItems', null, {});
	},
};
