import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product, addToCart, onProductClick }) {
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleProductClick = async () => {
    if (onProductClick) {
      await onProductClick()
    }
    navigate(`/product/${product.id}`)
  }

  return (
    <div
      className="product-card"
      onClick={handleProductClick}
      onKeyDown={(e) => e.key === 'Enter' && handleProductClick()}
      role="button"
      tabIndex={0}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button 
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="stars">{product.rating}</span>
          <span className="rating-text">({product.reviews})</span>
        </div>
        
        <div className="product-footer">
          <div className="product-pricing">
            <span className="product-price">${product.price}</span>
            <span className="original-price">${product.originalPrice}</span>
            <span className="discount-badge">{product.discount}% OFF</span>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
