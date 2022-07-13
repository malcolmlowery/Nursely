const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost } = require('../controller/posts.controller');

router.get('/', getPosts)
router.get('/:postID', getPost)
router.post('/', createPost)

module.exports = router;