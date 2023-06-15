const User = require('../schemas/User');
const hasher = require('pbkdf2-password')();

async function authenticate(username, password, callback) {
  const user = await User.findByName(username);

  if(!user) {
    callback(false, 'User with provided username does not exist in our database.')
    return;
  }

  hasher({ password, salt: user.salt }, (err, pass, salt, hash) => {
    if(err) {
      console.error(err);
      callback(false, 'Internal server error.');
    } else if(hash !== user.hash) {
      callback(false, 'Incorrect password.');
    } else {
      callback(true, null, user)
    }
  });
}

module.exports = authenticate;