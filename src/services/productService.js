const API_BASE_URL = 'http://localhost:8080/api/products';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            const errorText = await response.text();
    
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.details) {
                    const detailsString = Object.values(errorJson.details).join(', ');
                    throw new Error(detailsString || errorJson.message || 'Network response was not ok');
                }
                throw new Error(errorJson.message || 'An error occurred while fetching products');
            } catch (e) {
                throw new Error(errorText || 'Network response was not ok');
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
 
export async function createProduct(userId, productData) {
  const response = await fetch(`${API_BASE_URL}?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(productData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to create product');
  }
  return response.json();
}
 
export async function updateProduct(userId, productId, productData) {
  const response = await fetch(`${API_BASE_URL}/${productId}?userId=${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(productData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update product');
  }
  return response.json();
}
 
export async function deleteProduct(userId, productId) {
  const response = await fetch(`${API_BASE_URL}/${productId}?userId=${userId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to delete product');
  }
}