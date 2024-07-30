import React, { useState, useEffect } from 'react';

function Cart() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const cartData = JSON.parse(localStorage.getItem('cart')) || [];
		setCart(cartData);
	}, []);

	const handleRemove = id => {
		const updatedCart = cart.filter(item => item.id !== id);
		setCart(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<div>
			<h1>Корзина</h1>
			<ul>
				{cart.map(item => (
					<li key={item.id}>
						<h2>{item.name}</h2>
						<p>Количество: {item.quantity}</p>
						<p>Цена: {item.price} руб.</p>
						<button onClick={() => handleRemove(item.id)}>Удалить</button>
					</li>
				))}
			</ul>
			<h2>Общая стоимость: {totalPrice} руб.</h2>
		</div>
	);
}

export default Cart;
