const router = require('express').Router();
const { CartItem, Cart, Product } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/', verifyAccessToken, async (req, res) => {
	
	try {
		const cart = await Cart.findOne({
			where: { user_id: res.locals.user.id },
			include: [
				{
					model: CartItem,
					as: 'cartItems',
					include: [{ model: Product, as: 'product' }],
				},
			],
		});
		if (!cart) {
			return res.status(404).json({ message: 'Корзина не найдена' });
		}
		// console.dir(cart, {depth: null});
		console.log(cart.get({plain: true, nested: true}));
		res.json(cart);
		
	} catch (error) {
		console.error('Ошибка при получении данных корзины:', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});




module.exports = router;
