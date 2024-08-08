const express = require("express");
const router = express.Router();
const VocaloidController = require("./../controllers/VocaloidController");

router.get("/", VocaloidController.getAll);

module.exports = router;