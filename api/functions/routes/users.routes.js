const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser } = require('../controller/users.controller');

router.get('/', getUsers)
router.get('/:uid', getUser)
router.post('/', createUser)

module.exports = router;