export default function ProductCard({ product, onSelectProduct, currentUser, onEdit, onDelete }) {
  const isOutOfStock = product.stockQty <= 0;
 
  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '10px', padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      border: '1px solid #eaeaea', position: 'relative'
    }}>
      
      {/* Admin Action Buttons */}
      {currentUser?.admin && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
            style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
            style={{ backgroundColor: '#c0392b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
          >
            Delete
          </button>
        </div>
      )}
 
      {/* Main Card Click Container */}
      <div onClick={() => onSelectProduct(product)} style={{ cursor: 'pointer' }}>
        
        {/* Top Header: Square Image (Left) + Name/Brand (Right) */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '15px', textAlign: 'left' }}>
          <div style={{ width: '80px', height: '80px', minWidth: '80px', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#f9f9f9', border: '1px solid #eee' }}>
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <h3 style={{ margin: '0 0 4px 0', color: '#2c3e50', fontSize: '16px', lineHeight: '1.2' }}>{product.name}</h3>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold' }}>{product.brand}</p>
            <p style={{ margin: 0, color: '#555', fontSize: '12px', lineHeight: '1.4' }}>{product.description}</p>
          </div>
        </div>
 
        {/* Description */}
        {/* <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '13px', lineHeight: '1.4', textAlign: 'left' }}>{product.description}</p> */}
 
        {/* Price & Stock Row */}
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
 
      {/* Action Button */}
      <button
        disabled={isOutOfStock}
        onClick={() => onSelectProduct(product)}
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