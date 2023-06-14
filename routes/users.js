const express = require('express');
const db = require('../misc/database');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('_template', { main: 'users', users: db.getFormattedUsers(), user: req.session.user });
});

router.get('/:id', (req, res, next) => {
  const user = db.getUserById(req.params.id);
  if(!user) {
    res.render('_template', { main: '404', user: req.session.user });
  } else {
    res.render('_template', { main: 'userPage', user: req.session.user, data: user, posts: db.getPostsByUser(user.id) });
  }
});

module.exports = router;