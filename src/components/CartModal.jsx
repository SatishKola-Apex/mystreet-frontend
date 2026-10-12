import { useState } from 'react';
 
export default function CartModal({ isOpen, onClose, cartItems, checkoutError, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('COD');
  const [localError, setLocalError] = useState(''); // For local validation errors
 
  if (!isOpen) return null;
 
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
 
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '500px', maxHeight: '85vh', overflowY: 'auto',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>🛒 Your Shopping Cart</h2>
 
        {cartItems.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
              {cartItems.map((item, index) => (
                <li key={index} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid #eaeaea', paddingBottom: '12px', marginBottom: '12px'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>{item.name}</h4>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#7f8c8d' }}>
                      Size: <strong>{item.selectedSize || 'Standard'}</strong> | ₹{item.price} each
                    </p>
                    {/* Quantity Adjustment Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)}
                        style={{ width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold' }}
                      >-</button>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.quantity || 1}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)}
                        style={{ width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold' }}
                      >+</button>
                    </div>
                  </div>
 
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', color: '#27ae60', margin: '0 0 8px 0' }}>
                      ₹{item.price * (item.quantity || 1)}
                    </p>
                    <button
                      onClick={() => onRemoveItem(index)}
                      style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
 
            <h3 style={{ textAlign: 'right', color: '#2c3e50' }}>Total Amount: ₹{totalAmount}</h3>
 
            <div style={{ marginTop: '20px', borderTop: '1px solid #eaeaea', paddingTop: '15px' }}>
              {localError && (
                <div style={{ backgroundColor: '#ffadad', color: '#590000', padding: '10px 15px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', fontweight: 'bold', border: '1px solid #ff6b6b' }}>
                  ⚠️ {localError}
                </div>
              )}
              {checkoutError && (
                <div style={{ backgroundColor: '#ffadad', color: '#590000', padding: '10px 15px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', fontweight: 'bold', border: '1px solid #ff6b6b' }}>
                  ⚠️ {checkoutError}
                </div>
              )}
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Shipping Address:</label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => {
                  setShippingAddress(e.target.value);
                  setLocalError(''); // Clear local error on input change
                }}
                placeholder="Enter your full address"
                style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
 
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}>Payment Mode:</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Mock">Mock Payment</option>
              </select>
 
              <button
                onClick={() => {
                  if (!shippingAddress.trim()) {
                    // alert('Please enter a shipping address');
                    setLocalError('Please enter a shipping address');
                    return;
                  }
                  onCheckout({ shippingAddress, paymentMode });
                }}
                style={{
                  width: '100%', backgroundColor: '#27ae60', color: 'white', border: 'none',
                  padding: '12px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                Proceed to Checkout & Place Order
              </button>
            </div>
          </>
        )}
 
        <button
          onClick={onClose}
          style={{
            width: '100%', backgroundColor: '#7f8c8d', color: 'white', border: 'none',
            padding: '10px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}