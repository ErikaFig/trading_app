import axios from "axios";

const API_URL = "/api/v1";

export const getSellStocks = async () => {
  const response = await axios.get(`${API}/sell`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
};

export const sellStock = async (data) => {
  const response = await axios.post(
    `${API}/sell`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};