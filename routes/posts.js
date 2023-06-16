const Post = require('../schemas/Post');
const addPost = require('../misc/addPost');
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    if(!req.session.authUser) {
      res.redirect('/login');
    } else {
      Post.findAllPosts()
        .then((posts) => {
          res.render('posts', { user: req.session.authUser, posts });
        });
    }
  })
  .post((req, res) => {
    if(!req.session.authUser) {
      res.redirect('/login');
    } else {
      addPost(req.session.authUserId, req.body.title, req.body.content, (isSuccess, message) => {
        if(!isSuccess) {
          Post.findAllPosts()
            .then((posts) => {
              res.render('posts', { error: message, user: req.session.authUser, posts, ...req.body });
            });
        } else {
          Post.findAllPosts()
            .then((posts) => {
              res.render('posts', { success: 'Post added!', error: message, user: req.session.authUser, posts });
            });
        }
      });
    }
  });

module.exports = router;