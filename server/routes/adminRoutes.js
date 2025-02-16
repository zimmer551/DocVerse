const express = require('express');
const { getList, changeAccountStatus } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
// Router object
const router = express.Router();

// LIST GET
router.post("/getList", authMiddleware, getList);

// POST ACCOUNT STATUS
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus)


module.exports = router;