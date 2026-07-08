const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

const {
    createPortfolio,
    getUserPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} = require('../controllers/portfolioController');

router.post('/', verifyToken, createPortfolio);
router.get('/', verifyToken, getUserPortfolios);
router.get('/:id', verifyToken, getPortfolioById);
router.put('/:id', verifyToken, updatePortfolio);
router.delete('/:id', verifyToken, deletePortfolio);

module.exports = router;