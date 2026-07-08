const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  getPortfolioStocks
} = require("../controllers/portfolioStocksController");

router.get("/:id/stocks", verifyToken, getPortfolioStocks);

module.exports = router;