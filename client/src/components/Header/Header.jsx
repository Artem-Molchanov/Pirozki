import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user }) {
	return (
		<header>
			<div>
				<Link to='/'>Логотип</Link>
			</div>
			<nav>
				<Link to='/'>Главная</Link>
				{user ? (
					<>
						<span>Добро пожаловать, {user.name}!</span>
						<Link to='/cart'>Корзина</Link>
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
