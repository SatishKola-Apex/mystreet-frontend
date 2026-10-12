export default function OrderConfirmationModal({ isOpen, onClose, orderDetails }) {
  if (!isOpen || !orderDetails) return null;
 
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '450px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)', textAlign: 'center'
      }}>
        <h2 style={{ color: '#27ae60', marginTop: 0 }}>🎉 Order Placed Successfully!</h2>
        <p style={{ color: '#7f8c8d', fontSize: '14px' }}>Your order has been recorded in the database.</p>
 
        <div style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', margin: '20px 0', border: '1px solid #eaeaea' }}>
          <p style={{ margin: '6px 0', fontSize: '13px', color: '#333', wordBreak: 'break-all' }}>
            <strong>Order ID:</strong> {orderDetails.id}
          </p>
          <p style={{ margin: '6px 0', fontSize: '13px', color: '#333' }}>
            <strong>Shipping Address:</strong> {orderDetails.shippingAddress}
          </p>
          {/* <p style={{ margin: '6px 0', fontSize: '13px', color: '#333' }}>
            <strong>Payment Mode:</strong> {orderDetails.paymentMode}
          </p> */}
          <p style={{ margin: '6px 0', fontSize: '14px', color: '#333' }}>
            <strong>Total Amount:</strong> <span style={{ color: '#27ae60', fontWeight: 'bold' }}>₹{orderDetails.totalAmount}</span>
          </p>
        </div>
 
        <button
          onClick={onClose}
          style={{
            width: '100%', backgroundColor: '#27ae60', color: 'white', border: 'none',
            padding: '12px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Back to Store
        </button>
      </div>
    </div>
  );
}