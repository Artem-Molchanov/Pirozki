import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

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
		<div>
			<h1>{product.product_name}</h1>
			<p>{product.product_description}</p>
			<p>{product.product_price} руб.</p>
			<img src={product.img_url} alt={product.product_name} />
			{isRegistered ? (
				<button onClick={addToCart}>Добавить в корзину</button>
			) : (
				<p>Пожалуйста, залогиньтесь, чтобы добавить товар в корзину.</p>
			)}
		</div>
	);
}

export default ProductPage;
