const API_URL = 'http://localhost:8080/api/auth';

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Include cookies for session management
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Invalid credentials';
    
    try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorText;
    } catch (parseError) {
      errorMessage = errorText || 'Invalid credentials';
    }

    throw new Error(errorMessage);
  }
  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(userData)
  });
 
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'An error occurred';
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorText;
    } catch (parseErr) {
      errorMessage = errorText || 'An error occurred';
    }

    throw new Error(errorMessage);
  }
 
  return response.json();
}