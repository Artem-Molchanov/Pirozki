import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../data/mockData';

function ProductList() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(getProducts());
	}, []);

	return (
		<div>
			<h1>Список товаров</h1>
			<ul>
				{products.map(product => (
					<li key={product.id}>
						<Link to={`/product/${product.id}`}>
							<h2>{product.name}</h2>
							<p>{product.description}</p>
							<p>{product.price} руб.</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProductList;
