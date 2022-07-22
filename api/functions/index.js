const { admin } = require('./firebase.modules');
const { 
   createUser, 
   updateUser, 
   deleteUser 
} = require("./endpoints/user");
const { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
} = require("./endpoints/post");
const { 
   createComment,
   updateComment,
   deleteComment 
} = require("./endpoints/comments");

admin.initializeApp()

exports.user = { createUser, updateUser, deleteUser }
exports.comments = { 
   createComment,
   updateComment,
   deleteComment
}
exports.post = { 
   createPost, 
   getPost, 
   updatePost, 
   deletePost, 
   likePost 
}