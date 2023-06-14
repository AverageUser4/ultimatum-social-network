require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hash = require('pbkdf2-password')();
const db = require('./misc/database');
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
app.use(rootRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.render('_template', { main: '404', user: req.session.user });
});

// create example user and post
hash({ password: 'nimda' }, (err, pass, salt, hash) => {
  if(err) {
    throw err;
  }

  db.addUser('admin', 'Owner of this site.', hash, salt);
  db.addPost(db.users[0].id, 'This website is amazing!', 'This is literally the best social network EVER!');
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}.`));