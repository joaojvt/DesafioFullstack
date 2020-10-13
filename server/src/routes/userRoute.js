const express = require('express');
const router = express.Router();


const controller = require('../controllers/userController')

router.post('/login', controller.login);
router.get('/me', controller.me);

router.post('/user', controller.ensureToken, controller.create);
router.get('/user/:user_id', controller.ensureToken, controller.findById);
router.delete('/user/:user_id', controller.ensureToken, controller.delete);
router.patch('/user/:user_id', controller.ensureToken, controller.updateUser);
router.get('/users', controller.ensureToken, controller.getAll)
router.get('/users/:filter', controller.ensureToken, controller.searchByName)


module.exports = router;