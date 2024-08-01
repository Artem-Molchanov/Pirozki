import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

function Cart({ user, products }) {
	const [cartItems, setCartItems] = useState([]);
	const [totalSum, setTotalSum] = useState(0);

	useEffect(() => {
		axiosInstance
			.get(`${import.meta.env.VITE_API}carts`)
			.then(res => {
				console.log(res.data.total_sum);
				setTotalSum(res.data.total_sum);
				setCartItems(res.data.cartItems)
			})
			.catch(err => console.error('Ошибка при загрузке корзины:', err));
	}, [user]);
		useEffect(() => {
			axiosInstance
				.get(`${import.meta.env.VITE_API}carts`)
				.then(res => {

					setTotalSum(res.data.total_sum);
				})
				.catch(err => console.error('Ошибка при загрузке корзины:', err));
		}, [cartItems]);

	const removeItem = async id => {
		try {
			await axiosInstance.delete(`${import.meta.env.VITE_API}cartitems/${id}`);
			setCartItems(cartItems.filter(item => item.id !== id));
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины:', error);
		}
	};

	return (
		<div>
			<h1>Корзина</h1>
			{cartItems.length === 0 ? (
				<p>Ваша корзина пуста.</p>
			) : (
				<ul>
					{cartItems?.map(item => (
						<li key={item.id}>
							<h2>{item.product.product_name}</h2>
							<p>Количество: {item.quantity}</p>
							<p>Цена: {item.product.product_price * item.quantity} руб.</p>
							<button onClick={() => removeItem(item.id)}>Удалить</button>
						</li>
					))}
				</ul>
			)}
			<h2>Общая сумма: {totalSum} руб.</h2>
		</div>
	);
}

export default Cart;
