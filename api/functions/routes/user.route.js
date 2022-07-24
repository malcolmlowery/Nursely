const router = require('express').Router();
const { createUser, updateUser, deleteUser } = require('../controllers/user');
const { verifyUser } = require('../middleware/userAuth.middleware');

router.route('/')
   .post(createUser)
   .put(verifyUser, updateUser)
   .delete(verifyUser, deleteUser)

module.exports = router;