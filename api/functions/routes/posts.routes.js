const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controller/posts.controller');

router.get('/', getPosts)
router.get('/:postID', getPost)
router.post('/', createPost)
router.put('/:postID', updatePost)
router.delete('/:postID', deletePost)

module.exports = router;