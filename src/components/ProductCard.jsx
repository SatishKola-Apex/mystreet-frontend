export default function ProductCard({ product, onSelectProduct }) {
  const isOutOfStock = product.stockQty <= 0;
 
  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '10px', padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      cursor: 'pointer', border: '1px solid #eaeaea'
    }}
    onClick={() => onSelectProduct(product)}
    >
      <div>
        <h3 style={{ margin: '0 0 6px 0', color: '#2c3e50' }}>{product.name}</h3>
        <p style={{ margin: '0 0 6px 0', color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>{product.brand}</p>
        <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '13px' }}>{product.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '18px' }}>₹{product.price}</span>
          <span style={{
            fontSize: '12px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold',
            backgroundColor: isOutOfStock ? '#fadbd8' : '#e8f8f5',
            color: isOutOfStock ? '#c0392b' : '#27ae60'
          }}>
            {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.stockQty}`}
          </span>
        </div>
      </div>
 
      <button
        disabled={isOutOfStock}
        style={{
          backgroundColor: isOutOfStock ? '#bdc3c7' : '#3498db',
          color: 'white', border: 'none', padding: '10px', borderRadius: '6px',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '14px'
        }}
      >
        {isOutOfStock ? 'Out of Stock' : 'View Details & Select Size'}
      </button>
    </div>
  );
}