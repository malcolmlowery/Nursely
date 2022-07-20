const { admin } = require('./firebase.modules');
const { createUser, updateUser, deleteUser } = require("./endpoints/user");
const { createPost, updatePost } = require("./endpoints/post");

admin.initializeApp()

exports.user = { createUser, updateUser, deleteUser }
exports.post = { createPost, updatePost  }