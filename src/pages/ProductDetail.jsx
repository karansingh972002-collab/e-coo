import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import './ProductDetail.css'

function ProductDetail({ addToCart, onProductClick }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))
  const [selectedSize, setSelectedSize] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product)
    alert(`Added ${product.name} to cart!`)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product)
    navigate('/cart')
  }

  const handleRelatedProductClick = async (productId) => {
    if (onProductClick) {
      await onProductClick()
    }
    navigate(`/product/${productId}`)
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="product-detail">
      <div className="detail-container">
        {/* Left Side - Images */}
        <div className="images-section">
          <div className="image-gallery">
            <img src={product.image} alt={product.name} className="gallery-image" />
            <img src={product.image} alt={product.name} className="gallery-image" />
            <img src={product.image} alt={product.name} className="gallery-image" />
            <img src={product.image} alt={product.name} className="gallery-image" />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="details-section">
          <div className="details-sticky">
            <div className="brand-name">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="rating-section">
              <div className="rating-badge">
                {product.rating} ★
              </div>
              <span className="rating-count">{product.reviews} Ratings</span>
            </div>

            <div className="price-section">
              <span className="current-price">${product.price}</span>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount">({product.discount}% OFF)</span>
            </div>
            <div className="tax-info">inclusive of all taxes</div>

            {/* Size Selector */}
            <div className="size-section">
              <div className="size-header">
                <span className="size-label">SELECT SIZE</span>
                <button className="size-guide">SIZE CHART →</button>
              </div>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="add-bag-btn"
                onClick={handleAddToCart}
              >
                <span className="btn-icon">🛒</span>
                ADD TO BAG
              </button>
              <button 
                className={`wishlist-btn-large ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <span className="btn-icon">{isWishlisted ? '❤️' : '🤍'}</span>
                WISHLIST
              </button>
            </div>

            {/* Delivery Options */}
            <div className="delivery-section">
              <h3 className="section-title">DELIVERY OPTIONS</h3>
              <div className="pincode-check">
                <input type="text" placeholder="Enter pincode" className="pincode-input" />
                <button className="check-btn">CHECK</button>
              </div>
              <div className="delivery-info">
                <p>• Get it by <strong>3-5 days</strong></p>
                <p>• Pay on delivery available</p>
                <p>• Easy 30 days return & exchange</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-info-section">
              <h3 className="section-title">PRODUCT DETAILS</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-specs">
                <div className="spec-item">
                  <span className="spec-label">Material:</span>
                  <span className="spec-value">Premium Quality</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Pattern:</span>
                  <span className="spec-value">Solid</span>
                </div>
              </div>
            </div>

            {/* Offers */}
            <div className="offers-section">
              <h3 className="section-title">BEST OFFERS</h3>
              <div className="offer-item">
                <span className="offer-tag">Best Price</span>
                <div className="offer-text">
                  <strong>Applicable on:</strong> Orders above Rs. 999 (only on first purchase)
                </div>
              </div>
              <div className="offer-item">
                <span className="offer-tag">Coupon</span>
                <div className="offer-text">
                  <strong>SAVE20:</strong> Extra 20% off on 1st order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {relatedProducts.length > 0 && (
        <div className="similar-section">
          <h2 className="similar-title">SIMILAR PRODUCTS</h2>
          <div className="similar-grid">
            {relatedProducts.map(p => (
              <div 
                key={p.id} 
                className="similar-card"
                onClick={() => handleRelatedProductClick(p.id)}
              >
                <img src={p.image} alt={p.name} />
                <div className="similar-info">
                  <h4>{p.name}</h4>
                  <div className="similar-price">
                    <span className="price">Rs. {Math.floor(p.price * 80)}</span>
                    <span className="discount-badge">33% OFF</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
