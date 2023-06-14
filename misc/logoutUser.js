function logoutUser(req, callback) {
  req.session.destroy((err) => {
    if(err) {
      console.error(err);
    }
    callback();
  });
}

module.exports = logoutUser;