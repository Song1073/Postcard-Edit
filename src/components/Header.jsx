import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Save, Home, Palette } from 'lucide-react'
import './Header.css'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Heart className="logo-icon" />
            <span className="logo-text">Card Maker</span>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/gallery" className={`nav-link ${isActive('/gallery')}`}>
              <Palette size={20} />
              <span>Templates</span>
            </Link>
            <Link to="/saved" className={`nav-link ${isActive('/saved')}`}>
              <Save size={20} />
              <span>Saved</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

