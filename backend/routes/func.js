const express = require("express");
const Functions = require('../controllers/fucntion');
const router = express.Router();


router.post('/transfer', Functions.transfer)
router.post('/topup', Functions.topup)

module.exports = router;
