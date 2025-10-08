import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactForm.css';
import handymanAPI from './api';

// ✅ Now reads from a single `contact` prop (falls back to sensible defaults)
const ContactForm = ({ contact = {}, templateId }) => {
  const {
    title = 'Get Your Free Estimate',
    subtitle = 'Ready to get started? Contact us today for a free, no-obligation estimate. We respond to all inquiries within 24 hours.',
    formTitle = 'Ready to get started? Send us a message!',
    phone = '(112) 233-4455',
    email = 'contact@prohandy.com',
    hours = 'Mon–Fri: 7AM–7PM',
    note = 'Weekend & emergency calls available'
  } = contact;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ include the templateId
      await handymanAPI.post('/api/handyman/inquiries', {
        ...formData,
        templateId
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <ToastContainer position="bottom-center" />
      <section id="contact" className="contact-section">
        <h2>{title}</h2>
        <p className="contact-subtitle">{subtitle}</p>

        <div className="contact-wrap">
          {/* Left: form card */}
          <div className="contact-card">
            <h3 className="card-title">{formTitle}</h3>

            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div className="field">
                <label htmlFor="name">Full Name <span className="req">*</span></label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field field-span-2">
                <label htmlFor="email">Email Address <span className="req">*</span></label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field field-span-2">
                <label htmlFor="message">Message <span className="req">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Please describe your project or repair needs..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field field-span-2">
                <button type="submit" disabled={isSubmitting} className="contact-submit">
                  {isSubmitting ? 'Sending…' : 'Request Free Estimate'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: contact info */}
          <aside className="info-card">
            <h3 className="info-title">Contact Information</h3>

            <div className="info-row">
              <div className="info-icn">📞</div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-main">{phone}</div>
                <div className="info-sub">24/7 Emergency Service</div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icn">✉️</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-main">{email}</div>
                <div className="info-sub">We respond within 2 hours</div>
              </div>
            </div>

            <div className="info-row">
              <div className="info-icn">⏰</div>
              <div>
                <div className="info-label">Hours</div>
                <div className="info-main">{hours}</div>
                <div className="info-sub">{note}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
