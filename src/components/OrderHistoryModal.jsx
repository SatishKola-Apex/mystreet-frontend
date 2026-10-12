export default function OrderHistoryModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;
 
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '600px', maxHeight: '80vh', overflowY: 'auto',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>📦 Your Order History</h2>
 
        {orders.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No past orders found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
            {orders.map((order, index) => (
              <li key={order.id || index} style={{
                border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: '#fdfdfd'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#34495e', fontSize: '14px' }}>
                    Order ID: {order.id.substring(0, 8)}...
                  </span>
                  <span style={{
                    backgroundColor: '#e8f8f5', color: '#27ae60', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                  }}>
                    {order.status || 'PLACED'}
                  </span>
                </div>
 
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>
                  <strong>Shipping Address:</strong> {order.shippingAddress}
                </p>
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>
                  <strong>Total Amount:</strong> <span style={{ color: '#27ae60', fontWeight: 'bold' }}>₹{order.totalAmount}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
 
        <button
          onClick={onClose}
          style={{
            width: '100%', backgroundColor: '#7f8c8d', color: 'white', border: 'none',
            padding: '10px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}