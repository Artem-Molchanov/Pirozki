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
	const [products, setProducts] = useState([]);
	const isRegistered = !!user.user_name;

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

	useEffect(() => {
		axiosInstance.get(`${import.meta.env.VITE_API}products`)
			.then(data => setProducts(data.data))
			.catch(err => console.log(err));
	}, []);

	// useEffect(() => {
	// 	fetch(`${import.meta.env.VITE_TARGET}/api/products`)
	// 		.then(res => res.json())
	// 		.then(data => setProducts(data))
	// 		.catch(err => console.log(err));
	// }, []);



	return (
		<Router>
			<Header user={user} setUser={setUser} />
			<Routes>
				<Route
					path='/'
					element={
						<ProductList products={products} setProducts={setProducts} />
					}
				/>
				<Route
					path='/product/:id'
					element={
						<ProductPage products={products} isRegistered={isRegistered} />
					}
				/>
				<Route
					path='/cart'
					element={<Cart user={user} products={products} />}
				/>
				<Route path='/auth' element={<Auth setUser={setUser} />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
