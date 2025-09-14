import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react'
import { useEffect } from 'react'
import gsap from 'gsap'

const Footer = () => {
  useEffect(() => {
    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top')
    
    const handleScroll = () => {
      if (window.scrollY > 500) {
        gsap.to(scrollToTopBtn, { opacity: 1, scale: 1, duration: 0.3 })
      } else {
        gsap.to(scrollToTopBtn, { opacity: 0, scale: 0.8, duration: 0.3 })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sri Sai Digital Studios</h3>
            <p>
              Creating exceptional digital experiences that drive business growth 
              and connect brands with their audiences.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">Brand Identity</a></li>
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">E-commerce</a></li>
              <li><a href="#services">Photography</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get In Touch</h4>
            <div className="contact-info">
              <p>📧 hello@srisaidigitalstudios.com</p>
              <p>📞 +91 9876543210</p>
              <p>📍 123 Digital Street, Tech City</p>
            </div>
            <div className="newsletter">
              <h5>Newsletter</h5>
              <p>Subscribe to get the latest updates</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Sri Sai Digital Studios. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}

export default Footer