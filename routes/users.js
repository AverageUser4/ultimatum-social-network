const User = require('../schemas/User');
const Post = require('../schemas/Post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('users', { users: users, user: req.session.authUser });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.findPostsByAuthorId(req.params.id);

  if(!user) {
    res.render('404', { user: req.session.authUser });
  } else {
    console.log(user, req.session)
    res.render('userPage', { 
      user: req.session.authUser,
      data: user,
      posts: posts.map(post => {
        post.dontShowAuthor = true;
        return post;
      })
    });
  }
});

module.exports = router;