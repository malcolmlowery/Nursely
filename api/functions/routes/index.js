const express = require('express');
const rootRouter = express.Router();

const users = require('./users.routes');
const posts = require('./posts.routes');

rootRouter.use('/users', users)
rootRouter.use('/posts', posts)

module.exports = rootRouter;