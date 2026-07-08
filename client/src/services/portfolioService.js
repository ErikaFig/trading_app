import axios from "axios";

const API = "http://localhost:8205";

export const getPortfolios = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/portfolio`,
    portfolioData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};