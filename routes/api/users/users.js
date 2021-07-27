const express = require('express');
const router = express.Router();
const validate = require('./validation');
const userController = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const uploadAvatar = require('../../../helpers/upload');


router.post('/signup', validate.createUser, userController.reg);

router.post('/login', validate.loginUser, userController.login);

router.post('/logout', guard, userController.logout);

router.get('/current', guard, userController.currentUser);

router.patch('/avatars', guard, uploadAvatar.single('avatar'), userController.updateUserAvatar);

router.get('/verify/:verifyToken', userController.verify);

router.post('/verify', userController.repeatVerify)

module.exports = router;