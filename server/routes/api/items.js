const express = require("express");
const router = express.Router();
const ItemController = require("../../controllers/ItemController");
const auth = require('../../middleware/auth')
router.get("/", ItemController.index);
router.post("/", auth, ItemController.store);
router.delete("/:id", auth, ItemController.destroy);

module.exports = router;
