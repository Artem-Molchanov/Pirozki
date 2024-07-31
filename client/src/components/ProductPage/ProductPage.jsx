import React from 'react';
import { useParams } from 'react-router-dom';

function ProductPage({ products }) {
	const { id } = useParams();
	const product = products.find(product => product.id === parseInt(id));

	if (!product) return <p>Товар не найден.</p>;

	return (
		<div>
			<h1>{product.product_name}</h1>
			<p>{product.product_description}</p>
			<p>{product.product_price} руб.</p>
			<img src={product.img_url} alt={product.product_name} />
			<button>Добавить в корзину</button>
		</div>
	);
}

export default ProductPage;
