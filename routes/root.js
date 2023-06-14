const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('_template', { main: 'index', user: req.session.user });
});

module.exports = router;