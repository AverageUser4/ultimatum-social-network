const hash = require('pbkdf2-password')();
const User = require('../schemas/User');
const Post = require('../schemas/Post');

async function addExampleData() {
  let user = await User.exists({});
  const post = await Post.exists({});

  if(user && !post) {
    User.deleteMany({});
    user = null;
  }
  if(!user) {
    hash({ password: 'nimda' }, (err, pass, salt, hash) => {
      if(err) {
        throw err;
      }
    
      User.addUser('admin', 'Owner of this site.', hash, salt)
        .then(user => {
          Post.addPost(user._id, 'This website is amazing!', 'This is literally the best social network EVER!');
        });
    });
  }
}


module.exports = addExampleData;