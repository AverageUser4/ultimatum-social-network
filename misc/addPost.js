const db = require('./database');

function addPost(authorId, title, content, callback) {
  if(!title) {
    callback(false, 'You have to provide post title!');
  } else if(!content) {
    callback(false, 'You have to provide post content!');
  } else if(authorId == undefined) {
    callback(false, 'You have to be logged in!');
  } else {
    db.addPost(authorId, title, content);
    callback(true, null);
  }
}

module.exports = addPost;