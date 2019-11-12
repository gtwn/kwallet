const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const trans = require('../controllers/transaction');

router.post("", trans.addTransaction);


module.exports = router;
