export default function Navbar({ cartCount, onOpenCart, onOpenOrders }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 40px', backgroundColor: '#2c3e50', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>🛍️ MyStreeT Sneaker Store</h1>
      
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
          🛒 Cart <span style={{ backgroundColor: 'white', color: '#27ae60', padding: '2px 6px', borderRadius: '50%', fontSize: '12px' }}>{cartCount}</span> {cartCount === 1 ? 'item' : 'items'}
        </button>
      </div>
    </nav>
  );
}