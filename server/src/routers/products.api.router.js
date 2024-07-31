const router = require('express').Router();
const { Product } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/', async (req, res) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		console.error(error);
		res.sendStatus(400);
	}
});




module.exports = router;
