import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import './Home.css'

function Home({ addToCart, onProductClick, onButtonClick }) {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory('All')
    }
  }, [categoryParam])

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'discount':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleHomeClick = (event) => {
    if (event.target.closest('button')) {
      onButtonClick?.()
    }
  }

  return (
    <div className="home" onClickCapture={handleHomeClick}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Products</h1>
          <p className="hero-subtitle">Shop the latest trends at unbeatable prices</p>
          <button className="hero-btn">Shop Now</button>
        </div>
      </section>

      <div className="shop-container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>FILTERS</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>✕</button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">CATEGORIES</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">PRICE</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" />
                <span>Under Rs. 500</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Rs. 500 - Rs. 1000</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Rs. 1000 - Rs. 2000</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Above Rs. 2000</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">BRAND</h4>
            <div className="filter-search">
              <input type="text" placeholder="Search for Brand" />
            </div>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" />
                <span>Nike</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Adidas</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Puma</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Reebok</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">DISCOUNT RANGE</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input type="radio" name="discount" />
                <span>10% and above</span>
              </label>
              <label className="filter-option">
                <input type="radio" name="discount" />
                <span>20% and above</span>
              </label>
              <label className="filter-option">
                <input type="radio" name="discount" />
                <span>30% and above</span>
              </label>
              <label className="filter-option">
                <input type="radio" name="discount" />
                <span>40% and above</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          <div className="products-header">
            <div className="products-info">
              <h2>Products</h2>
              <span className="products-count">- {sortedProducts.length} items</span>
            </div>
            
            <div className="products-actions">
              <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                <span>FILTER</span>
              </button>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
              >
                <option value="featured">Recommended</option>
                <option value="new">What's New</option>
                <option value="rating">Customer Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Better Discount</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                onProductClick={onProductClick}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home
