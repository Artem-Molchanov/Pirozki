import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './ProductPage.module.css';

function ProductPage({ products, isRegistered }) {
	const { id } = useParams();
	const product = products.find(product => product.id === parseInt(id));

	if (!product) return <p>Товар не найден.</p>;

	const addToCart = async () => {
		try {
			await axiosInstance.post(`${import.meta.env.VITE_API}cartitems`, {
				product_id: product.id,
				quantity: 1, 
			});
			alert('Товар добавлен в корзину');
		} catch (error) {
			console.error('Ошибка при добавлении товара в корзину:', error);
			alert('Ошибка при добавлении товара в корзину');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.productName}>{product.product_name}</div>
			<div className={styles.productDescription}>{product.product_description}</div>
			<div className={styles.productPrice}>{product.product_price} руб.</div>
			<img
				className={styles.productImage}
				src={product.img_url}
				alt={product.product_name}
			/>
			{isRegistered ? (
				<button className={styles.addToCartButton} onClick={addToCart}>
					Добавить в корзину
				</button>
			) : (
				<div>Пожалуйста, залогиньтесь, чтобы положить пирожок в корзину.</div>
			)}
		</div>
	);
}

export default ProductPage;
