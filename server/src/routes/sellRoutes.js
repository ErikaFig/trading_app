const express = require("express");

const router = express.Router();

const {
    sellStock,
    getUserStocks
} = require("../controllers/sellController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getUserStocks);

router.post("/", authMiddleware, sellStock);

module.exports = router;