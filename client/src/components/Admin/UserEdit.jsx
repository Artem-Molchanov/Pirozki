import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './UserEdit.module.css';

function UserEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		user_name: '',
		email: '',
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get(
					`${import.meta.env.VITE_API}users/${id}`
				);
				setUser(response.data);
			} catch (err) {
				setError('Ошибка при загрузке пользователя');
				console.error(err);
			}
		};

		fetchUser();
	}, [id]);

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(prevUser => ({
			...prevUser,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axiosInstance.put(`${import.meta.env.VITE_API}users/${id}`, user);
			setSuccess('Данные пользователя успешно обновлены');
			setTimeout(() => navigate('/admin'), 2000);
		} catch (err) {
			setError('Ошибка при обновлении данных пользователя');
			console.error(err);
		}
	};

	return (
		<div className={styles.container}>
			<h1>Редактирование пользователя:</h1>
			{error && <div className={styles.error}>{error}</div>}
			{success && <div className={styles.success}>{success}</div>}
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor='user_name'>Имя пользователя:</label>
					<input
						type='text'
						id='user_name'
						name='user_name'
						value={user.user_name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={user.email}
						onChange={handleChange}
						required
					/>
				</div>
				<button type='submit' className={styles.saveButton}>
					Сохранить
				</button>
			</form>
		</div>
	);
}

export default UserEdit;
