import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Contact = () => {
  const contactRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate contact section
    gsap.fromTo('.contact-content > *',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    
    // Show success animation
    gsap.to('.contact-form', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section className="contact" ref={contactRef}>
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your next project? Let's create something amazing together.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Start a Conversation</h3>
            <p>
              We'd love to hear about your project and discuss how we can help 
              bring your vision to life. Reach out to us through any of the 
              following methods:
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <Mail size={24} />
                </div>
                <div className="method-info">
                  <h4>Email Us</h4>
                  <p>hello@srisaidigitalstudios.com</p>
                  <p>info@srisaidigitalstudios.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Phone size={24} />
                </div>
                <div className="method-info">
                  <h4>Call Us</h4>
                  <p>+91 9876543210</p>
                  <p>+91 8765432109</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <MapPin size={24} />
                </div>
                <div className="method-info">
                  <h4>Visit Us</h4>
                  <p>123 Digital Street</p>
                  <p>Tech City, TC 12345</p>
                </div>
              </div>
            </div>

            <div className="contact-hours">
              <h4>Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact