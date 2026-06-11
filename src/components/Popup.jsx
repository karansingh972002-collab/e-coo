import { useState, useEffect } from 'react'
import './Popup.css'

function Popup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after 12 seconds
    const timer = setTimeout(() => {
      // Check if user has already seen the popup today
      const lastSeen = localStorage.getItem('popupLastSeen')
      const today = new Date().toDateString()
      
      if (lastSeen !== today) {
        setIsVisible(true)
      }
    }, 12000) // 12 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Remember that user saw the popup today
    localStorage.setItem('popupLastSeen', new Date().toDateString())
  }

  const handleClaim = () => {
    // You can add logic to apply discount code here
    alert('Discount code SAVE50 applied!')
    handleClose()
  }

  if (!isVisible) return null

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose}>✕</button>
        
        <div className="popup-content">
          <div className="popup-badge">SPECIAL OFFER</div>
          
          <h2 className="popup-title">🎉 Extra 50% OFF!</h2>
          
          <p className="popup-subtitle">
            Get an additional 50% discount on your first purchase
          </p>
          
          <div className="popup-code">
            <span className="code-label">Use Code:</span>
            <span className="code-value">SAVE50</span>
          </div>
          
          <p className="popup-description">
            Limited time offer! Shop now and save big on all products.
          </p>
          
          <div className="popup-actions">
            <button className="popup-btn primary" onClick={handleClaim}>
              Claim Offer
            </button>
            <button className="popup-btn secondary" onClick={handleClose}>
              Maybe Later
            </button>
          </div>
          
          <p className="popup-terms">
            *Offer valid for 24 hours. Terms and conditions apply.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popup
