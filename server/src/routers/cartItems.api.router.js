const router = require('express').Router();
const { CartItem, Cart, Product } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/cartitems', verifyAccessToken, async (req, res) => {
	try {
		const cartItems = await CartItem.findAll();
		res.json(cartItems);
	} catch (error) {
		console.error(error);
		res.sendStatus(400);
	}
});

router.post('/cartitems', verifyAccessToken, async (req, res) => {
	const { product_id, quantity } = req.body;
	const { user } = res.locals;

	try {
		let cart = await Cart.findOne({ where: { user_id: user.id } });
		if (!cart) {
			cart = await Cart.create({ user_id: user.id, total_sum: 0 });
		}
		const product = await Product.findByPk(product_id);
		if (!product) {
			return res.status(404).json({ message: 'Продукт не найден' });
		}
		const newCartItem = await CartItem.create({
			cart_id: cart.id,
			product_id,
			quantity,
		});

		const updatedTotalSum = cart.total_sum + product.price * quantity;
		await cart.update({ total_sum: updatedTotalSum });

		res.status(201).json(newCartItem);
	} catch (error) {
		console.error('Ошибка при добавлении элемента в корзину:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

router.delete('/cartitems/:id', verifyAccessToken, async (req, res) => {
	const cartItemId = req.params.id;
	const { user } = res.locals;

	try {
		const cartItem = await CartItem.findByPk(cartItemId);
		if (!cartItem) {
			return res.status(404).json({ message: 'Элемент корзины не найден' });
		}
		const cart = await Cart.findByPk(cartItem.cart_id);
		if (cart.user_id !== user.id) {
			return res.status(403).json({ message: 'Нет доступа' });
		}
		const product = await Product.findByPk(cartItem.product_id);
		await cartItem.destroy();
		const updatedTotalSum = cart.total_sum - product.price * cartItem.quantity;
		await cart.update({ total_sum: updatedTotalSum });

		res.status(200).json({ message: 'Элемент удален' });
	} catch (error) {
		console.error('Ошибка при удалении', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

module.exports = router;
