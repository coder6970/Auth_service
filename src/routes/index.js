const express = require('express');
const router = express.Router();
const v1UserApiRoutes = require('./v1/index')

router.use('/v1',v1UserApiRoutes);

module.exports = router;