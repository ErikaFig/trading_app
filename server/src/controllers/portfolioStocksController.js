const pool = require("../db/db");

const getPortfolioStocks = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM portafolio_acciones
      WHERE id_portafolio = $1
      ORDER BY simbolo ASC
      `,
      [id]
    );

    res.json({
      stocks: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error obteniendo acciones"
    });
  }
};

module.exports = {
  getPortfolioStocks
};