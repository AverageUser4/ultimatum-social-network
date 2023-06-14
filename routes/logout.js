const express = require('express');
const logoutUser = require('../misc/logoutUser');
const router = express.Router();

router.get('/', (req, res) => {
  logoutUser(req, () => {
    res.redirect('/');
  });
});

module.exports = router;