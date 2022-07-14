const express = require('express');
const rootRouter = express.Router();

const users = require('./users.routes');
const posts = require('./posts.routes');
const likes = require('./likes.routes');

rootRouter.use('/users', users)
rootRouter.use('/posts', posts)
rootRouter.use('/likes', likes)

module.exports = rootRouter;