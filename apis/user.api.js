const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = function () {
    router.post('/create', userController.createUser);
    router.get('/', userController.getAllUsers);
    router.get('/:id', userController.getUserById);
    router.patch('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);
    
    return router;
}