require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');


const authRouter = require('./routers/auth.router');
const tokenRouter = require('./routers/token.router');
const productsRouter = require('./routers/products.api.router');
const cartItemsRouter = require('./routers/cartItems.api.router');
const cartsRouter = require('./routers/carts.api.router');
const userRouter = require('./routers/user.api.router')

const app = express();
const { PORT } = process.env;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/products', productsRouter);
app.use('/api/cartitems', cartItemsRouter);
app.use('/api/carts', cartsRouter);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use('*', (req, res) => {
	res.redirect('/');
});
