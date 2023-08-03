const express = require('express');
const { getList } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
// Router object
const router = express.Router();

// LIST GET
router.post("/getList", authMiddleware, getList);


module.exports = router;