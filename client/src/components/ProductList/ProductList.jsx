import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { getProducts } from '../../data/mockData';

function ProductList({products}) {


	return (
		<div>
			<h1>Список товаров</h1>
			<ul>
				{products.map(product => (
					<li key={product.id}>
						<Link to={`/product/${product.id}`}>
							<h2>{product.product_name}</h2>
							<p>{product.product_description}</p>
							<p>{product.product_price} руб.</p>
							<img src={product.img_url} alt="" />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProductList;
