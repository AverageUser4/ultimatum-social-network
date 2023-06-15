const express = require('express');
const authenticate = require('../misc/authenticate');
const loginUser = require('../misc/loginUser');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('login', { user: req.session.authUser });
  })
  .post((req, res) => {
    const { username, password } = req.body;
    authenticate(username, password, (isSuccess, message, user) => {
      if(!isSuccess) {
        res.render('login', { user: req.session.authUser, error: message });
      } else {
        loginUser(user, req, () => {
          console.log('logging user in', req.session)
          res.render('login', { user: req.session.authUser });
        });
      }
    });
  });

module.exports = router;