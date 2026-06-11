import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if email already exists
    if (users.some(u => u.email === formData.email)) {
      setErrors({ email: 'Email already registered' })
      return
    }

    // Add new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Auto login after signup
    localStorage.setItem('currentUser', JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile
    }))
    
    alert('Account created successfully!')
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop" alt="Shopping" />
          <div className="auth-image-overlay">
            <h2>Join Us Today!</h2>
            <p>Create an account to start shopping</p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-subtitle">Create your account in seconds</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

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
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10 digit mobile number"
                  className={errors.mobile ? 'error' : ''}
                  maxLength="10"
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
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
                    placeholder="Create a password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>I agree to the <Link to="/terms">Terms & Conditions</Link></span>
              </label>

              <button type="submit" className="auth-submit-btn">
                CREATE ACCOUNT
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
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
