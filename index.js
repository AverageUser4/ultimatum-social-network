require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const addExampleData = require('./misc/addExampleData');
const PORT = Number(process.env.PORT) || 3000;
const rootRouter = require('./routes/root');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'super secret'
}));
app.use(expressLayouts)
app.use(rootRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.render('404', { user: req.session.authUser });
});

const dbLink = 'mongodb://127.0.0.1/expressApp';
mongoose.connect(dbLink)
  .then(() => console.log(`Successfully connected to database at: ${dbLink}`))
  .catch((error) => console.error('Error when connecting to database', error));

addExampleData();

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}.`));