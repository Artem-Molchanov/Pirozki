import { useState, useEffect } from 'react';

export const useFetch = url => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				setData(data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Ошибка:', error);
				setLoading(false);
			});
	}, [url]);

	return { data, loading };
};
