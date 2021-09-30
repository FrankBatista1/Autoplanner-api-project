const express = require('express');
const router = express.Router();
const {deleteUserById, getAllUsers, getUserById} = require('../controllers/userController')

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUserById);

module.exports = router;