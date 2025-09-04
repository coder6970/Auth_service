const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');

router.post('/user',userController.create);
router.delete('/user',userController.destroy);

module.exports = router