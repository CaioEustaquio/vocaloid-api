const express = require("express");
const router = express.Router();
const ProducerController = require("./../controllers/ProducerController");

router.get("/", ProducerController.getAll);

module.exports = router;