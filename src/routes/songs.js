const express = require("express");
const router = express.Router();
const SongController = require("./../controllers/SongController");

router.get("/", SongController.getAll);
router.get("/:id", SongController.getById);
router.post("/", SongController.save);

module.exports = router;