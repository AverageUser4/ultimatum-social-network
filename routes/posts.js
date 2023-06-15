const db = require('../misc/database');
const addPost = require('../misc/addPost');
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    if(!req.session.user) {
      res.redirect('/login');
    } else {
      res.render('posts', { user: req.session.user, posts: db.getFormattedPosts() });
    }
  })
  .post((req, res) => {
    if(!req.session.user) {
      res.redirect('/login');
    } else {
      addPost(req.session.userId, req.body.title, req.body.content, (isSuccess, message) => {
        if(!isSuccess) {
          res.render('posts', { error: message, user: req.session.user, posts: db.getFormattedPosts() });
        } else {
          res.render('posts', { success: 'Post added!', user: req.session.user, posts: db.getFormattedPosts() });
        }
      });
    }
  });

module.exports = router;