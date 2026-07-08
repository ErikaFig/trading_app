import axios from "axios";

const API = "http://localhost:8205";

export const getStocks = async () => {
    const response = await axios.get(`${API}/stocks`);
    return response.data;
};

export const searchStock = async (symbol) => {
    const response = await axios.get(
        `${API}/stocks/search/${symbol}`
    );

    return response.data;
};