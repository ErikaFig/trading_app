const axios = require("axios");

const getStockQuotes = async (symbols) => {
  try {
    const response = await axios.get(
      `https://api.marketdata.app/v1/stocks/quotes/?symbols=${symbols}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MARKETDATA_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error MarketData:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  getStockQuotes,
};