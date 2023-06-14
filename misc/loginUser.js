function loginUser(user, req, callback) {
  req.session.regenerate((err) => {
    if(err) {
      console.error(err);
    }
    req.session.user = user.name;
    req.session.userId = user.id;
    callback();
  });
}

module.exports = loginUser;