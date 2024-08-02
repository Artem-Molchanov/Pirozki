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
	//счетчик корзины
	const [cartItemCount, setCartItemCount] = useState(0);

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
		axiosInstance
			.get(`${import.meta.env.VITE_API}products`)
			.then(data => setProducts(data.data))
			.catch(err => console.log(err));
	}, []);

	//счетчик товаров корзине:
	const updateCartItemCount = () => {
		axiosInstance.get(`${import.meta.env.VITE_API}carts`).then(res => {
			setCartItemCount(res.data.cartItems.length);
		});
	};
	//счетчик товаров динамически обновляем кружок
	useEffect(() => {
		if (isRegistered) {
			updateCartItemCount();
		}
	}, [isRegistered]);

	return (
		<Router>
			<Header user={user} setUser={setUser} cartItemCount={cartItemCount} />
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
						<ProductPage
							products={products}
							isRegistered={isRegistered}
							updateCartItemCount={updateCartItemCount}
						/>
					}
				/>
				<Route
					path='/cart'
					element={
						<Cart
							user={user}
							products={products}
							updateCartItemCount={updateCartItemCount}
						/>
					}
				/>
				<Route path='/auth' element={<Auth setUser={setUser} />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
