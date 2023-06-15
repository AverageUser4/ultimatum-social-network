function loginUser(user, req, callback) {
  req.session.regenerate((err) => {
    if(err) {
      console.error(err);
    }
    req.session.authUser = user.name;
    req.session.authUserId = user.id;
    callback();
  });
}

module.exports = loginUser;