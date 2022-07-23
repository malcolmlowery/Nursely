const { admin } = require('./firebase.modules');
const { getPosts } = require('./endpoints/posts');
const { createUser, updateUser, deleteUser } = require("./endpoints/user");
const { createComment, updateComment, deleteComment } = require("./endpoints/comments");
const { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
} = require("./endpoints/post");

admin.initializeApp()

exports.posts = { getPosts }
exports.user = { createUser, updateUser, deleteUser }
exports.comments = { createComment, updateComment, deleteComment }
exports.post = { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
}