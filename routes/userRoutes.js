var express = require('express');
var router = express.Router();
var auth = require('../utils/auth.js');
var user = require('../controllers/userController.js');

router.get('/list', auth.checkJwt(), auth.checkScopes('read:user'), user.list);

router.get('/find', user.find);

// router.put('/update', auth.checkJwt(), auth.checkScopes('update:user'), user.update); With JWT

router.put('/update', user.update);

router.delete('/delete', auth.checkJwt(), auth.checkScopes('delete:user'), user.delete);

// router.post('/save', auth.checkJwt(), auth.checkScopes('create:user'), user.save); With JWT

router.post('/save', user.save);

module.exports = router;