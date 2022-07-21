const { admin } = require('./firebase.modules');
const { createUser, updateUser, deleteUser } = require("./endpoints/user");
const { createCommentOnPost } = require("./endpoints/comments");
const { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
} = require("./endpoints/post");

admin.initializeApp()

exports.user = { createUser, updateUser, deleteUser }
exports.comments = { createCommentOnPost}
exports.post = { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
}