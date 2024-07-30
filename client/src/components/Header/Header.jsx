import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<div>
				<Link to='/'>Логотип</Link>
			</div>
			<nav>
				<Link to='/'>Главная</Link>
				<Link to='/cart'>Корзина</Link>
				<Link to='/auth'>Войти / Зарегистрироваться</Link>
			</nav>
		</header>
	);
}

export default Header;
