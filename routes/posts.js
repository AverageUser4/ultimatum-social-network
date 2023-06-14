const db = require('../misc/database');
const addPost = require('../misc/addPost');
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    if(!req.session.user) {
      res.redirect('/login');
    } else {
      res.render('_template', { main: 'posts', user: req.session.user, posts: db.getFormattedPosts() });
    }
  })
  .post((req, res) => {
    if(!req.session.user) {
      res.redirect('/login');
    } else {
      addPost(req.session.userId, req.body.title, req.body.content, (isSuccess, message) => {
        if(!isSuccess) {
          res.render('_template', { error: message, main: 'posts', user: req.session.user, posts: db.getFormattedPosts() });
        } else {
          res.render('_template', { success: 'Post added!', main: 'posts', user: req.session.user, posts: db.getFormattedPosts() });
        }
      });
    }
  });

module.exports = router;