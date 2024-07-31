'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Products',
			[
				{
					product_name: 'Пирожок с капустой',
					product_description: 'Вкусный, свежий и натуральный',
					product_price: '120',
					img_url:
						'https://e1.edimdoma.ru/data/recipes/0003/2327/32327-ed4_wide.jpg?1468668271',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					product_name: 'Пирожок с грибочками',
					product_description: 'Бодрящий и пробуждающий аппетит',
					product_price: '100',
					img_url:
						'https://eda.ru/images/RecipePhoto/930x622/pirozhki-s-gribami_30101_photo_12843.webp',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					product_name: 'Пирожок с маком снотворным',
					product_description: 'Вязкий, не даст заскучать',
					product_price: '200',
					img_url:
						'https://img.povar.ru/main/69/7e/bc/26/pirojki_s_makom-112085.jpg',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
