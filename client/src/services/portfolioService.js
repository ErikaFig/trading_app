import axios from "axios";

const API_URL = "/api/v1";

export const getPortfolios = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/portfolio`,
    portfolioData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
