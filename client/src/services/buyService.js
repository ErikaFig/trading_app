const API_URL = "http://localhost:8205";

export const buyStock = async (buyData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(buyData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al comprar");
    }

    return data;
};