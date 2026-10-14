export default function Navbar({ cartCount, onOpenCart, onOpenOrders, currentUser, onLogout, onOpenAuth }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 40px', backgroundColor: '#2c3e50', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px', color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>🛍️ MyStreeT Sneaker Store</h1>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          onClick={onOpenOrders}
          style={{
            backgroundColor: '#34495e', color: 'white', border: '1px solid #7f8c8d',
            padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          📦 My Orders
        </button>
 
        <button
          onClick={onOpenCart}
          style={{
            backgroundColor: '#27ae60', color: 'white', border: 'none',
            padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          🛒 Cart <span style={{ backgroundColor: 'white', color: '#27ae60', padding: '2px 6px', borderRadius: '10px', fontSize: '12px' }}>{cartCount}</span>
        </button>
 
        {/* Auth State & Username / Login Button on Navbar */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px', borderLeft: '1px solid #7f8c8d', paddingLeft: '15px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              👤 {currentUser.email ? currentUser.email.split('@')[0] : 'User'} 
              {currentUser.admin && <span style={{ backgroundColor: '#e67e22', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', marginLeft: '5px' }}>ADMIN</span>}
            </span>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#c0392b', color: 'white', border: 'none',
                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            style={{
              backgroundColor: '#2980b9', color: 'white', border: 'none',
              padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '10px'
            }}
          >
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}