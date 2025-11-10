import React, { useState } from 'react'
import { X, Mail, Send } from 'lucide-react'
import { getCardDataURL } from '../utils/exportUtils'
import './EmailModal.css'

function EmailModal({ cardRef, cardData, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    senderName: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.recipientEmail)) {
      setError('Please enter a valid email address')
      return
    }

    setSending(true)

    try {
      // Get card as data URL
      const cardImageURL = await getCardDataURL(cardRef.current)

      // In a real application, you would send this to a backend API
      // For this demo, we'll simulate the email sending
      await simulateEmailSending({
        ...formData,
        cardImage: cardImageURL,
        cardName: cardData.name
      })

      onSuccess()
    } catch (err) {
      console.error('Error sending email:', err)
      setError('Failed to send email. Please try again.')
      setSending(false)
    }
  }

  // Simulate email sending (in production, this would be an API call)
  const simulateEmailSending = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Email would be sent with data:', {
          to: data.recipientEmail,
          recipientName: data.recipientName,
          from: data.senderName,
          message: data.message,
          cardName: data.cardName,
          hasAttachment: !!data.cardImage
        })
        
        // Create a mailto link as fallback
        const subject = `You've received a greeting card from ${data.senderName || 'a friend'}!`
        const body = `Hi ${data.recipientName || 'there'},\n\n${data.message || 'Someone sent you a greeting card!'}\n\nBest regards,\n${data.senderName || 'Your friend'}`
        const mailtoLink = `mailto:${data.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        
        // Open mailto link
        window.location.href = mailtoLink
        
        resolve()
      }, 1500)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content email-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Mail size={24} />
            <h2>Send eCard</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="email-form">
          <div className="form-group">
            <label htmlFor="recipientEmail">
              Recipient Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleChange}
              required
              placeholder="friend@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipientName">Recipient Name</label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senderName">Your Name</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Personal Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Add a personal message to accompany your card..."
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? (
                <>
                  <div className="btn-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send eCard
                </>
              )}
            </button>
          </div>
        </form>

        <div className="email-note">
          <p>
            <strong>Note:</strong> This will open your default email client to send the card.
            In a production app, this would send the email directly through a server.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailModal

