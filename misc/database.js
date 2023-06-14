class DataBase {
  userId = 0;
  postId = 0;
  
  users = [];
  posts = [];

  getPost(id) {
    return this.posts.find(post => post.id === id);
  }

  getPostsByUser(id) {
    id = Number(id);
    return this.getFormattedPosts().filter(post => post.authorId === id).reverse();
  }

  getFormattedPosts() {
    return this.posts.map(post => ({ ...post, author: this.getUserById(post.authorId)?.name || 'Unknown author' })).reverse();
  }

  addPost(authorId, title, content) {
    this.posts.push({
      id: this.postId++, authorId, title, content
    });
  }

  editPost(postId, newTitle, newContent) {
    const post = this.getPost(postId);
    if(!post) {
      return;
    }

    post.title = newTitle ? newTitle : post.title;
    post.content = newContent ? newContent : post.content;
  }

  addUser(name, description, hash, salt) {
    if(this.users.find(user => user.name === name)) {
      return;
    }
    
    this.users.push({
      id: this.userId++, name, description, hash, salt
    })
  }

  getUser(name) {
    return this.users.find(user => user.name === name);
  }

  getUserById(id) {
    id = Number(id);
    return this.users.find(user => user.id === id);
  }

  hasUser(name) {
    return Boolean(this.getUser(name));
  }

  getFormattedUsers() {
    return this.users;
  }
}

module.exports = new DataBase();