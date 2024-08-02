import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './Admin.module.css';

function Admin() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axiosInstance.get(
					`${import.meta.env.VITE_API}users`
				);
				setUsers(response.data);
			} catch (err) {
				setError('Ошибка при загрузке пользователей');
				console.error(err);
			}
		};

		fetchUsers();
	}, []);

	const handleDelete = async id => {
		try {
			await axiosInstance.delete(`${import.meta.env.VITE_API}users/${id}`);
			setUsers(users.filter(user => user.id !== id));
		} catch (err) {
			setError('Ошибка при удалении пользователя');
			console.error(err);
		}
	};

	const handleEdit = id => {
		// Перенаправление на страницу редактирования пользователя (например, UserEdit)
		window.location.href = `/admin/edit/${id}`;
	};

	return (
		<div className={styles.container}>
			<h1>Зарегистрированные пользователи:</h1>
			{error && <div className={styles.error}>{error}</div>}
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Имя</th>
						<th>Email</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.user_name}</td>
							<td>{user.email}</td>
							<td>
								<button
									onClick={() => handleEdit(user.id)}
									className={styles.editButton}>
									Редактировать
								</button>
								<button
									onClick={() => handleDelete(user.id)}
									className={styles.deleteButton}>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Admin;
