import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Find user with matching email and password
    const user = users.find(u => 
      u.email === formData.email && u.password === formData.password
    )

    if (user) {
      // Store logged in user
      localStorage.setItem('currentUser', JSON.stringify({
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }))
      
      alert('Login successful!')
      navigate('/')
    } else {
      setErrors({ email: 'Invalid email or password' })
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop" alt="Shopping" />
          <div className="auth-image-overlay">
            <h2>Welcome Back!</h2>
            <p>Login to access your account</p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
              </div>

              <button type="submit" className="auth-submit-btn">
                LOGIN
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <button type="button" className="social-btn google-btn">
                <span>🔍</span> Continue with Google
              </button>

              <button type="button" className="social-btn facebook-btn">
                <span>f</span> Continue with Facebook
              </button>

              <p className="auth-switch">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
