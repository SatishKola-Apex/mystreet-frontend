import { useState } from 'react';
 
export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;
 
  // Split sizesCsv (e.g., "6,7,8,9,10,11") into an array
  const sizes = product.sizesCsv ? product.sizesCsv.split(',') : ['Standard'];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
 
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '450px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
      }}>

        <div style={{ height: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}>
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>{product.name}</h2>
        <p style={{ color: '#7f8c8d', fontWeight: 'bold', fontSize: '14px' }}>{product.brand}</p>
        <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>{product.description}</p>
        
        <p style={{ color: '#27ae60', fontSize: '20px', fontWeight: 'bold', margin: '15px 0' }}>₹{product.price}</p>
 
        <div style={{ margin: '20px 0' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#333' }}>
            Select Size:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size.trim())}
                style={{
                  padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
                  border: selectedSize === size.trim() ? '2px solid #2980b9' : '1px solid #ccc',
                  backgroundColor: selectedSize === size.trim() ? '#ebf5fb' : 'white',
                  color: selectedSize === size.trim() ? '#2980b9' : '#333'
                }}
              >
                {size.trim()}
              </button>
            ))}
          </div>
        </div>
 
        <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
          <button
            onClick={() => {
              onAddToCart({ ...product, selectedSize });
              onClose();
            }}
            style={{
              flex: 1, backgroundColor: '#27ae60', color: 'white', border: 'none',
              padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#bdc3c7', color: 'white', border: 'none',
              padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}