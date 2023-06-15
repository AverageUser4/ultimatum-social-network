const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
  },
  description: {
    type: String,
    minLength: 0,
    maxLength: 250,
  },
  hash: String,
  salt: String,
});

userSchema.statics.addUser = async function(name, description, hash, salt) {
  try {
    const user = await this.create({ name, description, hash, salt });
    console.log('Successfully added user!', user);
    return user;
  } catch(e) {
    console.error('Problem when trying to add user:', e);
  }
}

userSchema.statics.findByName = async function(name) {
  const user = await this.find({ name });
  return user[0];
}

userSchema.statics.findById = async function(id) {
  const user = await this.find({ _id: id });
  return user[0];
}

module.exports = mongoose.model('User', userSchema);