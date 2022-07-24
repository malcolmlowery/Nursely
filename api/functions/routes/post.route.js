const router = require('express').Router();
const { 
   createPost, 
   getPost, 
   updatePost,
   deletePost
} = require('../controllers/post');

router.route('/')
   .get(getPost)
   .post(createPost)
   .put(updatePost)
   .delete(deletePost)

module.exports = router;