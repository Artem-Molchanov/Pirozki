import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './Cart.module.css';

function Cart({ user, products, updateCartItemCount }) {
	const [cartItems, setCartItems] = useState([]);
	const [totalSum, setTotalSum] = useState(0);

	useEffect(() => {
		axiosInstance
			.get(`${import.meta.env.VITE_API}carts`)
			.then(res => {
				setTotalSum(res.data.total_sum);
				setCartItems(res.data.cartItems);
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
			updateCartItemCount();
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины:', error);
		}
	};

	return (
		<div className={styles.cartContainer}>
			<div className={styles.title}>Корзина</div>
			{cartItems.length === 0 ? (
				<div className={styles.emptyCart}>Ваша корзина пуста.</div>
			) : (
				<div className={styles.cartItemsContainer}>
					{cartItems?.map(item => (
						<div key={item.id} className={styles.cartItem}>
							<div className={styles.productName}>
								{item.product.product_name}
							</div>
							<div className={styles.productQuantity}>
								Количество: {item.quantity}
							</div>
							<div className={styles.productPrice}>
								Цена: {item.product.product_price * item.quantity} руб.
							</div>
							<button
								className={styles.removeButton}
								onClick={() => removeItem(item.id)}>
								Удалить
							</button>
						</div>
					))}
				</div>
			)}
			<div className={styles.totalSum}>Общая сумма: {totalSum} руб.</div>
		</div>
	);
}

export default Cart;
