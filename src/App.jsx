import { useState, useEffect } from 'react';
import { fetchProducts } from './services/productService';
import { placeOrder, fetchUserOrders } from './services/orderService';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
 
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState(''); // For checkout errors
  const [selectedProduct, setSelectedProduct] = useState(null); // For details modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);
 
  const [orders, setOrders] = useState([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
 
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
 
  const mockUserId = "d34ea5c8-796f-48b3-8b5d-13253c85807e";
 
  const loadCatalog = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };
 
  useEffect(() => {
    loadCatalog();
  }, []);
 
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };
 
  const handleAddToCart = (productWithVariant) => {
    // Check if item with same ID and size already exists in cart
    const existingIndex = cart.findIndex(
      item => item.id === productWithVariant.id && item.selectedSize === productWithVariant.selectedSize
    );
 
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...productWithVariant, quantity: 1 }]);
    }
  };
 
  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQty;
    setCart(updatedCart);
  };
 
  const handleRemoveItem = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };
 
  const handleCheckout = async ({ shippingAddress, paymentMode }) => {
    if (cart.length === 0) return;
 
    const orderPayload = {
      shippingAddress: shippingAddress,
      paymentMode: paymentMode,
      orderItems: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        selectedSize: item.selectedSize || "Standard"
      }))
    };
 
    try {
      const savedOrder = await placeOrder(mockUserId, orderPayload);
      setCart([]);
      setIsCartOpen(false);
      
      setConfirmedOrder(savedOrder);
      setIsConfirmationOpen(true);
      loadCatalog();
    } catch (error) {
      let cleanMessage = error.message;
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.message) cleanMessage = parsed.message;
      } catch (e) {
        // Use original error message if it's not JSON
      }
      setCheckoutError(cleanMessage);
    }
  };
 
  const handleOpenOrders = async () => {
    const userOrders = await fetchUserOrders(mockUserId);
    setOrders(userOrders);
    setIsOrdersOpen(true);
  };
 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', margin: 0, paddingBottom: '50px' }}>
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
        onOpenCart={() => {
          setCheckoutError(''); // Clear any previous checkout errors when opening the cart
          setIsCartOpen(true);
        }}
        onOpenOrders={handleOpenOrders}
      />
 
      <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>
          Product Catalog
        </h2>
 
        {loading ? (
          <p style={{ color: '#e67e22', fontSize: '18px' }}>Loading products from Spring Boot & H2 database...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginTop: '20px' }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} onSelectProduct={handleSelectProduct} />
            ))}
          </div>
        )}
      </main>
 
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />
 
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        checkoutError={checkoutError}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
 
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />
 
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        orderDetails={confirmedOrder}
      />
    </div>
  );
}