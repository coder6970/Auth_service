const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');
const {AuthRequestValidator} = require('../../middlewares/index')

router.post('/signup',AuthRequestValidator.validateUserAuth,userController.create);
router.post('/signin',AuthRequestValidator.validateUserAuth,userController.signIn);
router.delete('/user/:id',userController.destroy);
router.get('/isAuthenticated',userController.isAuthenticated);
router.get('/isAdmin',AuthRequestValidator.validIsAdminRequest,userController.isAdmin)

module.exports = router