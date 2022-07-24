const router = require('express').Router();
const { createUser, updateUser, deleteUser } = require('../controllers/user');

router.route('/')
   .post(createUser)
   .put(updateUser)
   .delete(deleteUser)

module.exports = router;