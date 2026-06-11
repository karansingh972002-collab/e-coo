import { useNavigate } from 'react-router-dom'
import './Cart.css'

function Cart({ cart, updateQuantity, removeFromCart, cartTotal, onClose, isSidebar }) {
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (onClose) onClose()
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className={`cart-page ${isSidebar ? 'cart-sidebar-content' : ''}`}>
        {isSidebar && (
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        )}
        <div className="empty-cart">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => {
              if (onClose) onClose()
              navigate('/')
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`cart-page ${isSidebar ? 'cart-sidebar-content' : ''}`}>
      {isSidebar && (
        <div className="cart-header">
          <h2>Shopping Cart ({cart.length})</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      )}
      
      {!isSidebar && (
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      )}

      <div className={isSidebar ? 'cart-content-sidebar' : 'container'}>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          
          <div className="summary-row">
            <span>Tax</span>
            <span>${(cartTotal * 0.1).toFixed(2)}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${(cartTotal * 1.1).toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <button 
            className="continue-shopping-link"
            onClick={() => {
              if (onClose) onClose()
              navigate('/')
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
