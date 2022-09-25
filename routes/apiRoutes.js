const express = require('express');
const userController = require('../controller/userController');
const authenticateRole = require('../middleware/authenticateRole');
const authenticateToken = require('../middleware/authenticateToken')
const authenticatePermission = require('../middleware/authenticatePermission')
const ROLE = require('../common/roles')

const router = express.Router();

router.route('/login')
    .post(userController.login)

router.route('/signup')
    .post(userController.signup)

router.route('/posts')
    .get(authenticateToken, userController.viewPosts)

router.route('/posts/:username')
    .get(authenticateToken, authenticatePermission, userController.viewPost)

router.route('/admin')
    .get(authenticateToken, authenticateRole(ROLE.ADMIN), userController.viewAdmin)

router.route('/logout')
    .post(userController.logout)

module.exports = router;
