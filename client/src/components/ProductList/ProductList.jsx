import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

function ProductList({products}) {
	return (
		<div className={styles.container}>
			{/* <h1>Наши пирожки:</h1> */}

				{products.map(product => (
					<div key={product.id} className={styles.card}>
						<Link to={`/product/${product.id}`}>
							<h2>{product.product_name}</h2>
							<p>{product.product_description}</p>
							<p>{product.product_price} руб.</p>
							<img src={product.img_url} alt='{product.product_name}' />
						</Link>
					</div>
				))}

		</div>
	);
}

export default ProductList;
