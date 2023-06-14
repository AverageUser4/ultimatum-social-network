const hasher = require('pbkdf2-password')();
const db = require('./database');

function createAccount(username, password, passwordRepeat, callback) {  
  if(username.includes(' ')) {
    callback(false, 'Username cannot contain any space characters.');
  } else if(username.length < 3) {
    callback(false, 'Username has to consist of at least 3 characters.');
  } else if(password !== passwordRepeat) {
    callback(false, 'Passwords do not match!');
  } else if(password.length < 3) {
    callback(false, 'Password has to consist of at least 3 characters.');
  } else {
    const user = db.getUser(username);
    if(user) {
      callback(false, 'User with that username already exists!');
    } else {
      hasher({ password }, (err, pass, salt, hash) => {
        if(err) {
          console.error(err);
          callback(false, 'Internal server error. Please try again later');
        } else {
          db.addUser(username, '', hash, salt);
          callback(true, null, db.getUser(username));
        }
      });
    }
  }
}

module.exports = createAccount;