import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<ProductList />} />
				<Route path='/product/:id' element={<ProductPage />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
