import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSavedDesigns, deleteDesign } from '../utils/storageUtils'
import { Edit, Trash2, Calendar, Save as SaveIcon } from 'lucide-react'
import './SavedDesigns.css'

function SavedDesigns() {
  const [designs, setDesigns] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  useEffect(() => {
    loadDesigns()
  }, [])

  const loadDesigns = () => {
    const savedDesigns = getSavedDesigns()
    setDesigns(savedDesigns.sort((a, b) => 
      new Date(b.savedAt) - new Date(a.savedAt)
    ))
  }

  const handleDelete = (id) => {
    if (deleteDesign(id)) {
      loadDesigns()
      setShowDeleteConfirm(null)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="saved-designs">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Saved Designs</h1>
            <p>Your saved greeting card designs</p>
          </div>
          <Link to="/gallery" className="btn btn-primary">
            Create New Card
          </Link>
        </div>

        {designs.length === 0 ? (
          <div className="empty-state card">
            <SaveIcon size={64} className="empty-icon" />
            <h2>No Saved Designs Yet</h2>
            <p>
              Start creating beautiful greeting cards and save your designs here
              to edit them later.
            </p>
            <Link to="/gallery" className="btn btn-primary">
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="designs-grid grid grid-3">
            {designs.map((design) => (
              <div key={design.id} className="design-card card">
                <div 
                  className="design-preview"
                  style={{ background: design.background }}
                >
                  <div className="design-content">
                    {design.elements.slice(0, 2).map((element, index) => {
                      if (element.type === 'text') {
                        return (
                          <div
                            key={index}
                            className="preview-text"
                            style={{
                              fontSize: `${element.fontSize * 0.3}px`,
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
                      if (element.type === 'image') {
                        return (
                          <img
                            key={index}
                            src={element.src}
                            alt=""
                            className="preview-image"
                            style={{
                              width: `${element.width * 0.3}px`,
                              height: `${element.height * 0.3}px`,
                              objectFit: 'cover'
                            }}
                          />
                        )
                      }
                      return null
                    })}
                  </div>
                </div>

                <div className="design-info">
                  <div className="design-meta">
                    <h3>{design.name || 'Untitled Card'}</h3>
                    <div className="design-date">
                      <Calendar size={14} />
                      <span>{formatDate(design.savedAt)}</span>
                    </div>
                  </div>

                  <div className="design-actions">
                    <Link
                      to={`/editor/saved-${design.id}`}
                      className="btn btn-primary"
                    >
                      <Edit size={18} />
                      Edit
                    </Link>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowDeleteConfirm(design.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Design?</h2>
            <p>Are you sure you want to delete this design? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedDesigns

