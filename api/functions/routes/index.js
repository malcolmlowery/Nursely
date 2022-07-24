const express = require('express');
const rootRouter = express.Router();

const { verifyUser } = require('../middleware/userAuth.middleware');

const user = require('./user.route');
const posts = require('./posts.route');
const post = require('./post.route');
const likePost = require('./like-post.route');
const comment = require('./comment.route');

rootRouter.use('/user', verifyUser, user)
rootRouter.use('/posts', verifyUser, posts)
rootRouter.use('/post', verifyUser, post)
rootRouter.use('/like-post', verifyUser, likePost)
rootRouter.use('/comment', verifyUser, comment)

module.exports = rootRouter;