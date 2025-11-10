import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cardCategories, getTemplatesByCategory } from '../templates/templateData'
import { Edit } from 'lucide-react'
import './TemplateGallery.css'

function TemplateGallery() {
  const { category } = useParams()
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    const filteredTemplates = getTemplatesByCategory(selectedCategory === 'all' ? null : selectedCategory)
    setTemplates(filteredTemplates)
  }, [selectedCategory])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="template-gallery">
      <div className="container">
        <div className="gallery-header">
          <h1>Choose Your Template</h1>
          <p>Select a design and customize it to make it your own</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Templates
          </button>
          {cardCategories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span className="filter-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid grid grid-3">
          {templates.map((template) => (
            <div key={template.id} className="template-card card">
              <div 
                className="template-preview"
                style={{ background: template.background }}
              >
                <div className="template-content">
                  {template.elements.slice(0, 2).map((element, index) => {
                    if (element.type === 'text') {
                      return (
                        <div
                          key={index}
                          className="preview-text"
                          style={{
                            fontSize: `${element.fontSize * 0.4}px`,
                            color: element.color,
                            fontFamily: element.fontFamily,
                            fontWeight: element.bold ? 'bold' : 'normal',
                            fontStyle: element.italic ? 'italic' : 'normal',
                            textAlign: 'center'
                          }}
                        >
                          {element.content}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
                <Link 
                  to={`/editor/${template.id}`}
                  className="btn btn-primary"
                >
                  <Edit size={18} />
                  Customize
                </Link>
              </div>
            </div>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="no-templates">
            <p>No templates found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateGallery

