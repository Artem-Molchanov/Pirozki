require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const tasksRouter = require('./routers//tasks.api.router');
const authRouter = require('./routers/auth.router');
const tokenRouter = require('./routers/token.router');

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

app.use('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
