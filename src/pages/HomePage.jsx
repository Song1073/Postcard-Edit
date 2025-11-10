import React from 'react'
import { Link } from 'react-router-dom'
import { cardCategories } from '../templates/templateData'
import { Sparkles, Download, Mail, Save, Palette } from 'lucide-react'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">
              Create Beautiful Greeting Cards
            </h1>
            <p className="hero-subtitle fade-in">
              Design personalized cards for every occasion. Choose from our templates,
              customize with your own text and images, and share instantly or download as PDF.
            </p>
            <div className="hero-buttons fade-in">
              <Link to="/gallery" className="btn btn-primary">
                <Sparkles size={20} />
                Browse Templates
              </Link>
              <Link to="/editor" className="btn btn-outline">
                <Palette size={20} />
                Start from Blank
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Our Card Maker?</h2>
          <div className="grid grid-4 features-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <Palette size={32} />
              </div>
              <h3>Easy Customization</h3>
              <p>Intuitive drag-and-drop editor with text, images, and design tools</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <Download size={32} />
              </div>
              <h3>Export to PDF</h3>
              <p>Download high-quality printable cards ready for any occasion</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <Mail size={32} />
              </div>
              <h3>Send eCards</h3>
              <p>Email your digital cards instantly to friends and family</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">
                <Save size={32} />
              </div>
              <h3>Save Designs</h3>
              <p>Store your creations and edit them anytime you want</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Browse by Occasion</h2>
          <div className="grid grid-3 categories-grid">
            {cardCategories.map((category) => (
              <Link
                key={category.id}
                to={`/gallery/${category.id}`}
                className="category-card card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Perfect Card?</h2>
            <p>Start designing now - it's free and easy!</p>
            <Link to="/gallery" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

