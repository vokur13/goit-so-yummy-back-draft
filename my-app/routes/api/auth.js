const express = require('express');

const ctrl = require('../../controllers');

const { validateBody, authenticate } = require('../../middleware');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
