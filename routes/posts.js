const db = require('../misc/database');
const addPost = require('../misc/addPost');
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    if(!req.session.authUser) {
      res.redirect('/login');
    } else {
      res.render('posts', { user: req.session.authUser, posts: db.getFormattedPosts() });
    }
  })
  .post((req, res) => {
    if(!req.session.authUser) {
      res.redirect('/login');
    } else {
      addPost(req.session.authUserId, req.body.title, req.body.content, (isSuccess, message) => {
        if(!isSuccess) {
          res.render('posts', { error: message, user: req.session.authUser, posts: db.getFormattedPosts() });
        } else {
          res.render('posts', { success: 'Post added!', user: req.session.authUser, posts: db.getFormattedPosts() });
        }
      });
    }
  });

module.exports = router;