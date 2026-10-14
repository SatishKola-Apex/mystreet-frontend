import React, { useState, useEffect } from 'react';
 
export default function ProductAdminModal({ isOpen, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState({
    name: '', brand: '', description: '', price: '', stockQty: '', imageUrl: '', sizesCsv: '7,8,9,10'
  });
 
  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ name: '', brand: '', description: '', price: '', stockQty: '', imageUrl: '', sizesCsv: '7,8,9,10' });
    }
  }, [productToEdit, isOpen]);
 
  if (!isOpen) return null;
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
 
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '450px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3>{productToEdit ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Brand" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault }} placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault }} placeholder="Stock Quantity" value={formData.stockQty} onChange={e => setFormData({...formData, stockQty: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Sizes CSV (e.g. 7,8,9,10)" value={formData.sizesCsv} onChange={e => setFormData({...formData, sizesCsv: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ flex: 1, backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
            <button type="button" onClick={onClose} style={{ flex: 1, backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}