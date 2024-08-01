'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Carts',
			[
				{
					user_id: 1,
					total_sum: 1000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 2,
					total_sum: 1500,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 3,
					total_sum: 500,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Carts', null, {});
	},
};
