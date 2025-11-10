import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TemplateGallery from './pages/TemplateGallery'
import CardEditor from './pages/CardEditor'
import SavedDesigns from './pages/SavedDesigns'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery/:category?" element={<TemplateGallery />} />
            <Route path="/editor/:templateId?" element={<CardEditor />} />
            <Route path="/saved" element={<SavedDesigns />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

