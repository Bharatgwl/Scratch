const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const ownersRouters = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

const db = require('./config/mongoose-connection');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/owners", ownersRouters);
app.use("/users", userRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});