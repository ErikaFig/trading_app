const API_URL = "/api/v1";

export const getPortfolioStocks = async (portfolioId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/portfolio/${portfolioId}/stocks`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};