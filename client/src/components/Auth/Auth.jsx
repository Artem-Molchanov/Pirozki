import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';

function Auth({ setUser }) {
	const [inputs, setInputs] = useState({});
	const [isRegister, setIsRegister] = useState(true);
	const navigate = useNavigate();

	const toggleForm = () => {
		setIsRegister(!isRegister);
	};

	const changeHandler = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const submitHandler = async e => {
		e.preventDefault();

		console.log('Форма отправлена');
		const type = isRegister ? 'signup' : 'signin';
		try {
			const response = await axiosInstance.post(
				`${import.meta.env.VITE_API}auth/${type}`,
				inputs
			);
			setUser(response.data.user); 
			setAccessToken(response.data.accessToken); 
			navigate('/');
		} catch (error) {
			console.error('Ошибка аутентификации:', error);
		}
	};

	return (
		<div>
			<h1>{isRegister ? 'Регистрация' : 'Вход'}</h1>
			<form onSubmit={submitHandler}>
				{isRegister && (
					<div>
						<label>Имя пользователя:</label>
						<input
							type='text'
							name='user_name'
							value={inputs.user_name || ''}
							onChange={changeHandler}
							placeholder='Имя пользователя'
						/>
					</div>
				)}
				<div>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={inputs.email || ''}
						onChange={changeHandler}
						placeholder='Эл.почта'
					/>
				</div>
				<div>
					<label>Пароль:</label>
					<input
						type='password'
						name='password'
						value={inputs.password || ''}
						onChange={changeHandler}
						placeholder='Пароль'
					/>
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
