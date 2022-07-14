const express = require('express');
const router = express.Router();
const { likePost } = require('../controller/likes.controller');

router.post('/', likePost)

module.exports = router;