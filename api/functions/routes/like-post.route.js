const router = require('express').Router();
const { likePost } = require('../controllers/post');

router.route('/').post(likePost)

module.exports = router;