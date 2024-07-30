import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../data/mockData';

function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const productData = getProductById(id);
		setProduct(productData);
	}, [id]);

	if (!product) return <p>Загрузка...</p>;

	return (
		<div>
			<h1>{product.name}</h1>
			<p>{product.description}</p>
			<p>{product.price} руб.</p>
			<button>Добавить в корзину</button>
		</div>
	);
}

export default ProductPage;
