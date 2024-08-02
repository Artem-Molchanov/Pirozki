import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Header.module.css';

function Header({ user, setUser, cartItemCount }) {
	//попытка в счетчик корзины:
	// const [cartItemCount, setCartItemCount] = useState(0);
	// useEffect(() => {
	// 	if (user.user_name) {
	// 		axiosInstance.get(`${import.meta.env.VITE_API}carts`).then(res => {
	// 			setCartItemCount(res.data.cartItems.length);
	// 		});
	// 	}
	// }, [user]);

	//попытка в счетчик корзины:

	const signOutHandler = async () => {
		const response = await axiosInstance.get(
			`${import.meta.env.VITE_API}auth/signout`
		);
		if (response.status === 200) {
			setUser({});
			setAccessToken('');
			// setCartItemCount(0); // Очистить количество товаров в корзине
		}
	};
	return (
		<header className={styles.header}>
			<div>
				<Link to='/' className={styles.logo}>
					<img
						src='https://qpirog.com/image/catalog/pirozhki.png'
						alt='Логотип'
						className={styles.logo}
					/>
				</Link>
			</div>
			<nav className={styles.nav}>
				<Link to='/'></Link>
				{user.user_name ? (
					<>
						<span className={styles.welcome}>
							Добро пожаловать, {user.user_name}!
						</span>
						<Link to='/cart' className='cart'>
							<img
								src='https://www.svgrepo.com/show/148458/shopping-cart.svg'
								alt='Корзина'
								className={styles.cart}
							/>
							{cartItemCount > 0 && (
								<span className={styles.cartBadge}>{cartItemCount}</span>
							)} 
						</Link>
						<Link onClick={signOutHandler} className='exit'>
							<img
								src='https://cdn.onlinewebfonts.com/svg/img_310775.png'
								alt='Выйти'
								className={styles.exit}
							/>
						</Link>
					</>
				) : (
					<>
						<Link to='/auth'>Войти / Зарегистрироваться</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;
