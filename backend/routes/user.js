const express = require("express");

const UserController = require("../controllers/user");

const Functions = require('../controllers/fucntion');

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:account", UserController.getProfile);

router.get("/transac/:accountts", UserController.getTransaction);




module.exports = router;
