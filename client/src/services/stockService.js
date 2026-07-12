import axios from "axios";

const API_URL = "/api/v1";

export const getStocks = async () => {
    const response = await axios.get(`${API_URL}/stocks`);
    return response.data;
};

export const searchStock = async (symbol) => {
    const response = await axios.get(
        `${API_URL}/stocks/search/${symbol}`
    );

    return response.data;
};
