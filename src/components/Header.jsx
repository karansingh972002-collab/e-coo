import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ cartCount, onCartClick, onButtonClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in on mount and route change
    const checkUser = () => {
      const user = localStorage.getItem('currentUser')
      if (user) {
        setCurrentUser(JSON.parse(user))
      } else {
        setCurrentUser(null)
      }
    }
    
    checkUser()
    
    // Listen for storage changes (for multi-tab sync)
    window.addEventListener('storage', checkUser)
    
    return () => {
      window.removeEventListener('storage', checkUser)
    }
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick()
    }
    navigate('/cart')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setShowProfileMenu(false)
    alert('Logged out successfully!')
    navigate('/')
  }

  const handleLoginClick = () => {
    setShowProfileMenu(false)
    navigate('/login')
  }

  const handleSignupClick = () => {
    setShowProfileMenu(false)
    navigate('/signup')
  }

  const handleHeaderClick = (event) => {
    if (location.pathname === '/' && event.target.closest('button')) {
      onButtonClick?.()
    }
  }

  return (
    <header className="header" onClickCapture={handleHeaderClick}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-text">SHOPHUB</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/?category=Men" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            MEN
          </Link>
          <Link to="/?category=Women" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            WOMEN
          </Link>
          <Link to="/?category=Kids" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            KIDS
          </Link>
          <Link to="/?category=Home & Living" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            HOME & LIVING
          </Link>
          <Link to="/?category=Beauty" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            BEAUTY
          </Link>
        </nav>

        <form className="search-container" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="header-actions">
          <div 
            className="action-item profile-wrapper" 
            onMouseEnter={() => setShowProfileMenu(true)} 
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button className="action-btn">
              <span className="action-icon">👤</span>
              <span className="action-label">{currentUser ? currentUser.name.split(' ')[0] : 'Profile'}</span>
            </button>
            {showProfileMenu && (
              <div className="profile-dropdown">
                {currentUser ? (
                  <>
                    <div className="dropdown-section user-info">
                      <div className="user-name">{currentUser.name}</div>
                      <div className="user-email">{currentUser.email}</div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Orders</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Wishlist</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Gift Cards</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Contact Us</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Coupons</button>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-section">
                      <button className="dropdown-item primary-item" onClick={handleLoginClick}>
                        <strong>Login</strong>
                      </button>
                      <button className="dropdown-item" onClick={handleSignupClick}>
                        New User? Sign Up
                      </button>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        alert('Please login to view orders')
                      }}>Orders</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        alert('Please login to view wishlist')
                      }}>Wishlist</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Gift Cards</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Contact Us</button>
                      <button className="dropdown-item" onClick={() => {
                        setShowProfileMenu(false)
                        navigate('/')
                      }}>Coupons</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="action-item action-btn" onClick={() => {
            if (currentUser) {
              navigate('/')
            } else {
              alert('Please login to view wishlist')
              navigate('/login')
            }
          }}>
            <span className="action-icon">❤️</span>
            <span className="action-label">Wishlist</span>
          </button>

          <button className="action-item action-btn" onClick={handleCartClick}>
            <span className="action-icon">🛒</span>
            <span className="action-label">Bag</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
