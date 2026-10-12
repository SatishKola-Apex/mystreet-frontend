const API_BASE_URL = 'http://localhost:8080/api';
 
export const placeOrder = async (userId, orderPayload) => {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload),
  });
 
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to place order');
  }
 
  return await response.json(); // Returns the created Order entity
};
 
export const fetchUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/mine?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch order history');
    return await response.json();
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};