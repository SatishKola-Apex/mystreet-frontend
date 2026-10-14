const API_BASE_URL = 'http://localhost:8080/api';

export const placeOrder = async (userId, orderPayload) => {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, //No Authorization header needed, Session cookie handles it automatically
    credentials: 'include', // Include cookies for session management
    body: JSON.stringify(orderPayload),
  });
  if (!response.ok) {
    const errorText = await response.text();
    
    try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.details) {
            const detailsString = Object.values(errorJson.details).join(', ');
            throw new Error(detailsString || errorJson.message || 'Invalid order data');
        }
        throw new Error(errorJson.message || 'An error occurred while placing the order');
    } catch (e) {
        throw new Error(errorText || 'Invalid order data');
    }
  }
  return await response.json(); // Returns the created Order entity
};

export const fetchUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/mine?userId=${userId}`, {
      method: 'GET',
      credentials: 'include', // Include cookies for session management
    });
    if (!response.ok) {
      const errorText = await response.text();
    
    try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.details) {
            const detailsString = Object.values(errorJson.details).join(', ');
            throw new Error(detailsString || errorJson.message || 'Invalid request');
        }
        throw new Error(errorJson.message || 'An error occurred while fetching user orders');
    } catch (e) {
        throw new Error(errorText || 'Invalid request');
    }
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};