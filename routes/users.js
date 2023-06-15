const User = require('../schemas/User');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  
  res.render('users', { users: users, user: req.session.user });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if(!user) {
    res.render('404', { user: req.session.user });
  } else {
    res.render('userPage', { user: req.session.user, data: user, posts: [] });
  }
});

module.exports = router;