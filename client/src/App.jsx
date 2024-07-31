import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';
import axiosInstance, { setAccessToken } from './axiosInstance';

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		axiosInstance
			.get(`${import.meta.env.VITE_API}tokens/refresh`)
			.then(res => {
				setUser(res.data.user);
				setAccessToken(res.data.accessToken);
			})
			.catch(err => {
				console.error('Ошибка при обновлении токена:', err);
			});
	}, []);

	return (
		<Router>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<ProductList />} />
				<Route path='/product/:id' element={<ProductPage />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/auth' element={<Auth setUser={setUser} />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
