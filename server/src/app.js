const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const stockRoutes = require("./routes/stockRoutes");
const buyRoutes = require("./routes/buyRoutes");
const sellRoutes = require("./routes/sellRoutes")
const portfolioStocksRoutes = require("./routes/portfolioStocksRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1/stocks", stockRoutes);
app.use("/api/v1/buy", buyRoutes);
app.use("/api/v1/sell", sellRoutes);
app.use("/api/v1/portfolio", portfolioStocksRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Trading API funcionando'
    });
});

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.json({
            success: true,
            db_time: result.rows[0]
        });
    } catch (error) {
        console.error('Error DB:', error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = app;
