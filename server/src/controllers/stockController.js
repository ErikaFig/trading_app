const {
  getStockQuotes,
} = require("../services/marketDataService");
const axios = require("axios");


const getStocks = async (req, res) => {
  try {
    const data = await getStockQuotes(
      "AAPL,META,MSFT,TSLA,NVDA"
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo stocks",
    });
  }
};

const searchStock = async (req, res) => {

    try {

        const { symbol } = req.params;

        const response = await axios.get(

            `https://api.marketdata.app/v1/stocks/quotes/${symbol}/`,

            {
                headers: {
                    Authorization: `Bearer ${process.env.MARKETDATA_TOKEN}`
                }
            }

        );

        res.json(response.data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "No se encontró la acción"
        });

    }

};

module.exports = {

    getStocks,

    searchStock

};