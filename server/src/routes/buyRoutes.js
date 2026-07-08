const express = require("express");
const router = express.Router();
const { buyStock } = require("../controllers/buyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, buyStock);

module.exports = router;