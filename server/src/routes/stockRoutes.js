const express = require("express");
const router = express.Router();

const {
    getStocks,
    searchStock
} = require("../controllers/stockController");

router.get("/", getStocks);
router.get("/search/:symbol", searchStock);

module.exports = router;