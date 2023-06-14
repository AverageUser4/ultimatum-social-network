const express = require('express');
const authenticate = require('../misc/authenticate');
const loginUser = require('../misc/loginUser');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('_template', { main: 'login', user: req.session.user });
  })
  .post((req, res) => {
    const { username, password } = req.body;
    authenticate(username, password, (isSuccess, message, user) => {
      if(!isSuccess) {
        res.render('_template', { main: 'login', user: req.session.user, error: message });
      } else {
        loginUser(user, req, () => {
          console.log('logging user in', req.session)
          res.render('_template', { main: 'login', user: req.session.user });
        });
      }
    });
  });

module.exports = router;