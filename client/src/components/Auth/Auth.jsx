import React, { useState } from 'react';

function Auth() {
	const [isRegister, setIsRegister] = useState(true);

	const toggleForm = () => {
		setIsRegister(!isRegister);
	};

	return (
		<div>
			<h1>{isRegister ? 'Регистрация' : 'Вход'}</h1>
			<form>
				{isRegister && (
					<div>
						<label>Имя пользователя:</label>
						<input type='text' />
					</div>
				)}
				<div>
					<label>Email:</label>
					<input type='email' />
				</div>
				<div>
					<label>Пароль:</label>
					<input type='password' />
				</div>
				<button type='submit'>
					{isRegister ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</form>
			<button onClick={toggleForm}>
				{isRegister
					? 'Уже есть аккаунт? Войти'
					: 'Нет аккаунта? Зарегистрироваться'}
			</button>
		</div>
	);
}

export default Auth;
