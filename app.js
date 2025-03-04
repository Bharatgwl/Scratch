// env setup command is  $env:DEBUG="development:*"
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();
const ownersRouters = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');

const db = require('./config/mongoose-connection');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
})
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use("/owners", ownersRouters);
app.use("/users", userRouter);
app.use("/products", productsRouter);
require('dotenv').config();

app.listen(3000, () => {
    console.log("server started on port 3000");
});
