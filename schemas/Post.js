const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId, 
    ref: "User",
  },
  title: {
    type: String,
    minLength: 1,
    maxLength: 50,
  },
  content: {
    type: String,
    minLength: 1,
    maxLength: 500,
  },
});

postSchema.statics.addPost = async function(author, title, content) {
  try {
    const post = await this.create({ author, title, content });
    console.log('Successfully added post!', post);
    return post;
  } catch(e) {
    console.error('Error when trying to add post:', e);
  }
}

postSchema.statics.findPostsByAuthorId = async function(id) {
  const posts = await this.where({ author: id }).populate('author');
  return posts;
}

module.exports = mongoose.model('Post', postSchema);