import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './services/productService';
import { placeOrder, fetchUserOrders } from './services/orderService';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import AuthModal from './components/AuthModal'; // Import the AuthModal component
import ProductAdminModal from './components/ProductAdminModal';
 
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mystreet_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState(''); // For checkout errors
  const [selectedProduct, setSelectedProduct] = useState(null); // For details modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);
 
  const [orders, setOrders] = useState([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
 
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
 
  // const mockUserId = "d34ea5c8-796f-48b3-8b5d-13253c85807e";
  // Initialize user session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('mystreet_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
 
  // Handle successful login or registration
  const handleAuthSuccess = (userData, rawPassword) => {
    const userToStore = { ...userData, password: rawPassword }; // Store the raw password for immediate use
    setCurrentUser(userToStore);
    localStorage.setItem('mystreet_user', JSON.stringify(userToStore));
    localStorage.setItem('mystreet_is_admin', JSON.stringify(userData.admin));
    setIsAuthModalOpen(false);
  };
 
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mystreet_user');
    localStorage.removeItem('mystreet_is_admin');
    localStorage.removeItem('mystreet_cart');
    setCart([]);
  };
 
  const loadCatalog = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };
 
  useEffect(() => {
    loadCatalog();
  }, []);

  useEffect(() => {
    localStorage.setItem('mystreet_cart', JSON.stringify(cart));
  }, [cart]);
 
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
 
    // Check if user is logged in dynamically instead of using mockUserId
    if (!currentUser || !currentUser.id) {
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
      setCheckoutError("Please log in or register to complete your order.");
      return;
    }
    
    const orderPayload = {
      shippingAddress,
      paymentMode,
      orderItems: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        selectedSize: item.selectedSize || "Standard"
      }))
    };
 
    try {
      // Use currentUser.id instead of mockUserId
      const savedOrder = await placeOrder(currentUser.id, orderPayload);
      setCart([]);
      setIsCartOpen(false);
      
      setConfirmedOrder(savedOrder);
      setIsConfirmationOpen(true);
      loadCatalog();
    } catch (error) {
      let cleanMessage = error.message|| "An unexpected error occurred.";

      if (cleanMessage.includes('401') || cleanMessage.includes('403') || cleanMessage.toLowerCase().includes('user') || cleanMessage.toLowerCase().includes('unauthorized')) {
        localStorage.removeItem('mystreet_user');
        localStorage.removeItem('mystreet_is_admin');
        setCurrentUser(null);

        setIsCartOpen(false);
        setIsAuthModalOpen(true);
        alert("Your session has expired or you are not authorized. Please log in again.");
        return; // Exit early since we're redirecting to login
      }
      // Check if the message looks like JSON before attempting to parse
      if (cleanMessage.trim().startsWith("{")) {
        try {
          const parsed = JSON.parse(cleanMessage);
          if (parsed.message) {
            cleanMessage = parsed.message;
          }
        } catch (e) {
          // Fallback to the original message if parsing fails
        }
      }
  
      setCheckoutError(cleanMessage);
    }
  };
 
  const handleOpenOrders = async () => {
    if (!currentUser || !currentUser.id) {
      setIsAuthModalOpen(true);
      return;
    }
    const userOrders = await fetchUserOrders(currentUser.id);
    setOrders(userOrders);
    setIsOrdersOpen(true);
  };

  const handleSaveProduct = async (productData) => {
  try {
    if (productToEdit) {
      await updateProduct(currentUser.id, productToEdit.id, productData);
    } else {
      await createProduct(currentUser.id, productData);
    }
    setIsAdminModalOpen(false);
    setProductToEdit(null);
    loadCatalog(); // Refresh product list instantly
  } catch (err) {
    alert(err.message || 'Operation failed');
  }
};
 
const handleDeleteProduct = async (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await deleteProduct(currentUser.id, productId);
    loadCatalog(); // Refresh product list instantly
  } catch (err) {
    alert(err.message || 'Failed to delete product');
  }
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
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
 
      <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>
            Product Catalog
          </h2>

          {/* Admin-only Add product button */}
          {currentUser?.admin && (
            <button 
              onClick={() => {
                setProductToEdit(null);
                setIsAdminModalOpen(true);
              }}
              style={{
                backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
              }}>
                + Add New Product
              </button>
          )}
        </div>
 
        {loading ? (
          <p style={{ color: '#e67e22', fontSize: '18px' }}>Loading products from Spring Boot & H2 database...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginTop: '20px' }}>
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelectProduct={handleSelectProduct}
                currentUser={currentUser}
                onEdit={(prod) => {
                  setProductToEdit(prod);
                  setIsAdminModalOpen(true);
                }}
                onDelete={handleDeleteProduct}
              />
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <ProductAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}