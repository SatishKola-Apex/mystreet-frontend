import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/authService';
 
export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  if (!isOpen) return null;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginMode) {
        const user = await loginUser({ email, password });
        onAuthSuccess(user);
      } else {
        await registerUser({ email, password });
        // Automatically log in after successful registration or switch to login
        const user = await loginUser({ email, password });
        onAuthSuccess(user);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
      // setError(err.response?.data?.message || err.message || 'Authentication failed')
      // let errorMsg = 'Authentication failed';
      // const data = err.response?.data;

      // if (data) {
      //   if (typeof data === 'string') {
      //     try {
      //       const parsed = JSON.parse(data);
      //       errorMsg = parsed.message || data;
      //     } catch (e) {
      //       errorMsg = data;
      //     }
      //   } else if (typeof data === 'object') {
      //     errorMsg = data.message || JSON.stringify(data);
      //   }
      // } else if (err.message) {
      //   errorMsg = err.message;
      // }

      // setError(errorMsg);
    }
  };
 
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '350px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>{isLoginMode ? 'Login to Continue' : 'Create an Account'}</h3>
        
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
 
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
 
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
 
          <button type="submit" style={{ backgroundColor: '#2c3e50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
 
        <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '15px' }}>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLoginMode(!isLoginMode)}
            style={{ color: '#3498db', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLoginMode ? 'Register' : 'Login'}
          </span>
        </p>
 
        <button onClick={onClose} style={{ width: '100%', backgroundColor: '#e74c3c', color: 'white', padding: '8px', border: 'none', borderRadius: '4px', marginTop: '10px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}