export const getProducts = () => [
	{
		id: 1,
		name: 'Товар 1',
		description: 'Описание товара 1',
		price: 1000,
	},
	{
		id: 2,
		name: 'Товар 2',
		description: 'Описание товара 2',
		price: 2000,
	},
	// Добавьте больше товаров по необходимости
];

export const getProductById = id =>
	getProducts().find(product => product.id === Number(id));
