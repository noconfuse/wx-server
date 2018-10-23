const express = require('express');
const router = express.Router();
router.use('/ai',require('./baiduAi'))
router.use('/map',require('./baiduMap'))
module.exports = router