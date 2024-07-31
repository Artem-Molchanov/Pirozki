import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from '../../styles/App.module.css';

function Header({ user, setUser }) {
	const signOutHandler = async () => {
		const response = await axiosInstance.get(
			`${import.meta.env.VITE_API}auth/signout`
			
		);
		if (response.status === 200) {
			setUser({});
			setAccessToken('');
		}
	};
	return (
		<header className={styles.header}>
			<div>
				<Link to='/' className={styles.logo}>
					Логотип
				</Link>
			</div>
			<nav className={styles.nav}>
				<Link to='/'>Главная</Link>
				{user.user_name ? (
					<>
						<span className={styles.welcome}>
							Добро пожаловать, {user.user_name}!
						</span>
						<Link to='/cart'>Корзина</Link>
						<Link onClick={signOutHandler}>Выйти</Link>
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
