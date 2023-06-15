const express = require('express');
const router = express.Router();
const createAccount = require('../misc/createAccount');
const loginUser = require('../misc/loginUser');

router.route('/')
  .get((req, res) => {
    res.render('register', { user: req.session.user });
  })
  .post((req, res) => {
    const { username, password, passwordRepeat } = req.body;
    createAccount(username, password, passwordRepeat, (isSuccess, message, user) => {
      if(!isSuccess) {
        res.render('register', { error: message });
      } else {
        loginUser(user, req, () => {
          res.render('register', { user: req.session.user });
        });
      }
    });
  });

module.exports = router;