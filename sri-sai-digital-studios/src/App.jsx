import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroVideo from './assets/12716-241674181.mp4'
import cameraImage from './assets/camera-431119-removebg-preview.png'
import heroBgImage from './assets/photography-1850469_1280.jpg'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const homeRef = useRef(null)
  const servicesRef = useRef(null)
  const headerRef = useRef(null)
  const ctaRef = useRef(null)

  // Toggle mobile menu and control body scroll
  const toggleMobileMenu = (isOpen) => {
    setIsMobileMenuOpen(isOpen)
    
    // Disable/enable body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }

  const handleGetStarted = () => {
    setCurrentPage('contact')
  }

  const handleViewPortfolio = () => {
    setCurrentPage('portfolio')
  }

  const handleNavigation = (page) => {
    // Close mobile menu when navigating and re-enable scroll
    toggleMobileMenu(false)
    // Page transition animation
    gsap.to('.page-content', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentPage(page)
        gsap.to('.page-content', {
          opacity: 1,
          duration: 0.3
        })
      }
    })
  }

  // Cleanup scroll lock on component unmount
  useEffect(() => {
    return () => {
      // Re-enable scroll when component unmounts
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }, [])

  // GSAP Animations for Home Page
  useEffect(() => {
    if (currentPage === 'home') {
      // Hero section animation timeline
      const heroTl = gsap.timeline({ delay: 0.2 })
      
      // Hero badge animation
      heroTl.fromTo('.hero-section div:first-child', 
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      )
      
      // Hero title animation
      .fromTo('.hero-title', 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      )
      
      // Hero subtitle animation
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      
      // Hero CTA buttons animation
      .fromTo('.hero-btn-primary', 
        { opacity: 0, x: -50, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-btn-secondary', 
        { opacity: 0, x: 50, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      
      // Hero stats animation
      .fromTo('.stat-item', 
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.2,
          ease: 'power2.out'
        },
        '-=0.3'
      )

      // Services stagger animation
      gsap.fromTo('.service-card', 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.15,
          ease: 'power2.out',
          delay: 1.2
        }
      )

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 2, ease: 'back.out(1.7)' }
      )

      // Floating background elements
      gsap.to('.floating-element', {
        y: '-20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.3
      })
      
      // Hero stats hover animations
      document.querySelectorAll('.stat-item').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
          gsap.to(stat, { scale: 1.1, duration: 0.3, ease: 'power2.out' })
        })
        stat.addEventListener('mouseleave', () => {
          gsap.to(stat, { scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      })
    }
  }, [currentPage])

  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        // For home page, services section is shown below the full-screen hero
        return null
      case 'about':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#1a365d', marginBottom: '1rem' }}>About Sri Sai Digital Photo Studio</h1>
            <p style={{ color: '#4a5568', fontSize: '1.2rem', marginBottom: '2rem' }}>Capturing memories with professional excellence</p>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>Sri Sai Digital Photo Studio is a premier photography and videography service provider specializing in capturing life's most precious moments. With state-of-the-art 4K Ultra HD equipment and creative expertise, we deliver exceptional quality that preserves your memories for a lifetime.</p>
              <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>Our experienced team combines technical excellence with artistic vision to create stunning visuals that tell your unique story. From intimate baby shoots to grand wedding celebrations, we handle every project with care and professionalism.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#ff6b35' }}>★</div>
                  <h4 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>5+ Years Experience</h4>
                  <p style={{ color: '#4a5568', margin: 0, fontSize: '0.9rem' }}>Professional photography expertise</p>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#ff6b35' }}>◉</div>
                  <h4 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>4K Ultra HD</h4>
                  <p style={{ color: '#4a5568', margin: 0, fontSize: '0.9rem' }}>Latest technology equipment</p>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#ff6b35' }}>♥</div>
                  <h4 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>500+ Happy Clients</h4>
                  <p style={{ color: '#4a5568', margin: 0, fontSize: '0.9rem' }}>Satisfied customers</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'services':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#1a365d', marginBottom: '1rem' }}>Our Photography Services</h1>
            <p style={{ color: '#4a5568', fontSize: '1.2rem', marginBottom: '2rem' }}>Professional photography and videography for all occasions</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Pre-Wedding Shoot</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Romantic and creative pre-wedding photography sessions</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Outdoor locations</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Creative concepts</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ 4K video coverage</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Birthday Shoot</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Memorable birthday celebrations and milestone moments</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Themed decorations</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Candid moments</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Family portraits</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Baby Shoot</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Adorable newborn and baby photography sessions</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Newborn portraits</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Milestone photos</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Family bonding</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Event Photography</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Comprehensive coverage for all types of events</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Corporate events</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Cultural celebrations</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Live streaming</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Videography & Editing</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Professional video production and post-processing</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ 4K Ultra HD recording</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Professional editing</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Color grading</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Album Designing</h3>
                <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Custom photo album creation and design services</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#4a5568' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Premium materials</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Custom layouts</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Digital delivery</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'portfolio':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#1a365d', marginBottom: '1rem' }}>Our Photography Gallery</h1>
            <p style={{ color: '#4a5568', fontSize: '1.2rem', marginBottom: '2rem' }}>Explore our stunning portfolio of captured moments</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              {/* Wedding Photography */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #ff6b35, #f093fb)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Wedding</div>
                  <span style={{ color: 'white', fontSize: '3rem' }}></span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>Wedding Photography</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Beautiful wedding moments captured with artistic vision</p>
              </div>
              
              {/* Baby Photography */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Baby Shoot</div>
                  <span style={{ color: 'white', fontSize: '3rem' }}></span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>Baby & Birthday Shoots</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Precious moments of little ones and birthday celebrations</p>
              </div>
              
              {/* Family Photography */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #38a169, #68d391)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Family</div>
                  <span style={{ color: 'white', fontSize: '3rem' }}></span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>Family Portraits</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Heartwarming family moments in outdoor settings</p>
              </div>
              
              {/* Event Photography */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #e53e3e, #fc8181)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Events</div>
                  <span style={{ color: 'white', fontSize: '3rem' }}></span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>Event Photography</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Corporate and cultural event coverage with professionalism</p>
              </div>
              
              {/* Pre-Wedding */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #d69e2e, #f6e05e)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Pre-Wedding</div>
                  <span style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>♥</span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>Pre-Wedding Shoots</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Romantic and creative couple photography sessions</p>
              </div>
              
              {/* Videography */}
              <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #553c9a, #9f7aea)', 
                  height: '250px', 
                  borderRadius: '8px', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>4K Video</div>
                  <span style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>▶</span>
                </div>
                <h3 style={{ color: '#1a365d', marginBottom: '0.5rem' }}>4K Videography</h3>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Ultra HD video production with professional editing</p>
              </div>
            </div>
            
            <div style={{ marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Why Choose Sri Sai Digital Photo Studio?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ff6b35' }}>★</div>
                  <h4 style={{ color: '#1a365d', margin: '0 0 0.5rem 0' }}>Professional Quality</h4>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>5+ years of experience</p>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ff6b35' }}>◉</div>
                  <h4 style={{ color: '#1a365d', margin: '0 0 0.5rem 0' }}>Latest Equipment</h4>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>4K Ultra HD technology</p>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ff6b35' }}>♥</div>
                  <h4 style={{ color: '#1a365d', margin: '0 0 0.5rem 0' }}>Client Satisfaction</h4>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>500+ happy customers</p>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#ff6b35' }}>✦</div>
                  <h4 style={{ color: '#1a365d', margin: '0 0 0.5rem 0' }}>Creative Vision</h4>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>Artistic approach</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#1a365d', marginBottom: '1rem' }}>Get In Touch</h1>
            <p style={{ color: '#4a5568', fontSize: '1.2rem', marginBottom: '2rem' }}>Ready to start your next project?</p>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a365d', fontWeight: '500' }}>Name</label>
                  <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a365d', fontWeight: '500' }}>Email</label>
                  <input type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a365d', fontWeight: '500' }}>Message</label>
                  <textarea rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', resize: 'vertical' }}></textarea>
                </div>
                <button style={{ 
                  background: '#ff6b35', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: '100%'
                }}>Send Message</button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <div className="App">
      {currentPage === 'home' ? (
        // Full-screen hero layout for home page
        <>
          {/* Full-screen Hero Section with Navigation Inside */}
          <div className="hero-section-fullscreen" ref={headerRef} style={{ 
            position: 'relative',
            width: '100vw',
            height: '100vh',
            textAlign: 'center', 
            background: 'transparent',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            zIndex: '1'
          }}>
            {/* Background Image */}
            <div className="hero-image-container" style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: '0',
              overflow: 'hidden'
            }}>
              <div 
                className="hero-background-image"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${heroBgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
            
            {/* Navigation Inside Hero Section */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              zIndex: '10000',
              padding: '1.5rem 3rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                margin: 0,
                cursor: 'pointer',
                fontSize: '2rem',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }} onClick={() => handleNavigation('home')}>Sri Sai Digital Photo Studio</h2>
              
              {/* Three-Line Hamburger Menu Button - Positioned on Right */}
              <button 
                className="hamburger-menu"
                onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '4px',
                  width: '40px',
                  height: '40px'
                }}
              >
                <div 
                  className={`hamburger-line line1 ${isMobileMenuOpen ? 'open' : ''}`}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: 'white',
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    
                    transformOrigin: 'center',
                    transform: isMobileMenuOpen 
                      ? 'rotate(45deg) translate(6px, 6px)' 
                      : 'rotate(0deg) translate(0px, 0px)'
                  }}></div>
                <div 
                  className={`hamburger-line line2 ${isMobileMenuOpen ? 'open' : ''}`}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: 'white',
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    
                    opacity: isMobileMenuOpen ? '0' : '1',
                    transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)'
                  }}></div>
                <div 
                  className={`hamburger-line line3 ${isMobileMenuOpen ? 'open' : ''}`}
                  style={{
                    width: '25px',
                    height: '3px',
                    background: 'white',
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    
                    transformOrigin: 'center',
                    transform: isMobileMenuOpen 
                      ? 'rotate(-45deg) translate(6px, -6px)' 
                      : 'rotate(0deg) translate(0px, 0px)'
                  }}></div>
              </button>
              
              {/* Navigation Menu - Enhanced Slides in from right side */}
              {isMobileMenuOpen && (
                <div className="hamburger-menu-container">
                  <div 
                    className="menu-overlay"
                    onClick={() => toggleMobileMenu(false)}
                    style={{
                      position: 'fixed',
                      top: '0',
                      left: '0',
                      width: '100vw',
                      height: '100vh',
                      background: 'rgba(0,0,0,0.6)',
                      zIndex: '2147483646',
                      backdropFilter: 'blur(2px)'
                    }}
                  />
                  <div className="right-side-menu" style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: 'min(400px, 90vw)',
                    maxWidth: '400px',
                    height: '100vh',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(26,54,93,0.95) 100%)',
                    backdropFilter: 'blur(25px)',
                    padding: 'min(1rem, 2vw)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    zIndex: '2147483647',
                    boxShadow: '-10px 0 40px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.1)',
                    transform: 'translateX(0)',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    overflowY: 'auto'
                  }}>
                  {/* Enhanced Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '2px solid rgba(255,107,53,0.3)',
                    position: 'relative'
                  }}>
                    <button 
                      onClick={() => toggleMobileMenu(false)}
                      className="animated-close-btn"
                    >
                      <span className="left">
                        <span className="circle-left"></span>
                        <span className="circle-right"></span>
                      </span>
                      <span className="right">
                        <span className="circle-left"></span>
                        <span className="circle-right"></span>
                      </span>
                    </button>
                  </div>
                  
                  {/* Enhanced Navigation Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <button onClick={() => handleNavigation('home')} style={{
                      background: currentPage === 'home' 
                        ? 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: currentPage === 'home' 
                        ? 'none' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',

                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: currentPage === 'home' 
                        ? '0 8px 25px rgba(255,107,53,0.3)' 
                        : 'none'
                    }}>
                      <span style={{ position: 'relative', zIndex: 2 }}>Home</span>
                      {currentPage !== 'home' && (
                        <div style={{
                          position: 'absolute',
                          left: '-2px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '0%',
                          background: '#ff6b35',

                          borderRadius: '0 2px 2px 0'
                        }} className="nav-indicator" />
                      )}
                    </button>
                    
                    <button onClick={() => handleNavigation('about')} style={{
                      background: currentPage === 'about' 
                        ? 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: currentPage === 'about' 
                        ? 'none' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',

                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: currentPage === 'about' 
                        ? '0 8px 25px rgba(255,107,53,0.3)' 
                        : 'none'
                    }}>
                      <span style={{ position: 'relative', zIndex: 2 }}>About</span>
                    </button>
                    
                    <button onClick={() => handleNavigation('services')} style={{
                      background: currentPage === 'services' 
                        ? 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: currentPage === 'services' 
                        ? 'none' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',

                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: currentPage === 'services' 
                        ? '0 8px 25px rgba(255,107,53,0.3)' 
                        : 'none'
                    }}>
                      <span style={{ position: 'relative', zIndex: 2 }}>Services</span>
                    </button>
                    
                    <button onClick={() => handleNavigation('portfolio')} style={{
                      background: currentPage === 'portfolio' 
                        ? 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: currentPage === 'portfolio' 
                        ? 'none' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',

                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: currentPage === 'portfolio' 
                        ? '0 8px 25px rgba(255,107,53,0.3)' 
                        : 'none'
                    }}>
                      <span style={{ position: 'relative', zIndex: 2 }}>Portfolio</span>
                    </button>
                    
                    <button onClick={() => handleNavigation('contact')} style={{
                      background: currentPage === 'contact' 
                        ? 'linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: currentPage === 'contact' 
                        ? 'none' 
                        : '1px solid rgba(255,255,255,0.2)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: '600',

                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: currentPage === 'contact' 
                        ? '0 8px 25px rgba(255,107,53,0.3)' 
                        : 'none'
                    }}>
                      <span style={{ position: 'relative', zIndex: 2 }}>Contact</span>
                    </button>
                  </div>
                  
                  {/* Footer in sidebar */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    borderTop: '2px solid rgba(255,107,53,0.2)',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '1rem',
                      margin: '0 0 0.5rem 0',
                      fontWeight: '600',
                      fontFamily: '"Playfair Display", "Georgia", serif'
                    }}>Sri Sai Digital Photo Studio</p>
                    <p style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.8rem',
                      margin: '0 0 1.5rem 0'
                    }}>Capturing Life's Precious Moments</p>
                    
                    {/* Social Media Icons */}
                    <ul className="social-media-icons">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f icon"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram icon"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-whatsapp icon"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              )}

            </div>
            
            {/* Hero Content */}
            <div style={{ 
              position: 'relative', 
              zIndex: '3', 
              maxWidth: '1000px', 
              margin: '0 auto', 
              padding: '0 2rem',
              width: '100%'
            }}>

              
              <h1 className="hero-title" style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                marginBottom: '1.5rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}>Capturing Life's Most
                <br />
                <span style={{
                  color: '#ff6b35',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>Precious Moments</span>
              </h1>
              
              <div className="section-divider" style={{ 
                margin: '2rem auto',
                background: '#ff6b35',
                width: '60px',
                height: '4px',
                borderRadius: '2px'
              }}></div>
              
              <p className="hero-subtitle" style={{
                fontSize: '1.4rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                lineHeight: '1.7',
                fontWeight: '400',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}>Where Every Frame Tells Your Unique Story</p>
              
              {/* Hero CTA Buttons - FORCE VISIBLE */}
              <div style={{
                display: 'flex !important',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '4rem',
                opacity: '1 !important',
                visibility: 'visible !important',
                zIndex: '9999 !important',
                position: 'relative !important',
                width: '100%',
                height: 'auto',
                minHeight: '60px'
              }}>
                <button 
                  onClick={handleGetStarted}
                  className="hero-btn-primary"
                  >BOOK YOUR SESSION</button>
                <button 
                  onClick={handleViewPortfolio}
                  className="hero-btn-secondary"
                  >VIEW OUR GALLERY</button>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content Below Hero */}
          <div className="home-content-sections" style={{
            position: 'relative',
            zIndex: '2',
            background: '#f8fafc',
            minHeight: '100vh',
            padding: '4rem 2rem'
          }}>
            {/* Services Section */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
              {/* Camera Image - Coming from right edge */}
              <div className="services-camera-image">
                <img 
                  src={cameraImage} 
                  alt="Professional Camera" 
                />
              </div>
              
              {/* Second Camera Image - Left bottom, rotated */}
              <div className="services-camera-left">
                <img 
                  src={cameraImage} 
                  alt="Professional Camera" 
                />
              </div>
              <div className="services-section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '1rem',
                  color: '#1a365d'
                }}>Our Photography Services</h2>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: '#ff6b35',
                  margin: '0 auto 2rem',
                  borderRadius: '2px'
                }}></div>
                <p style={{
                  color: '#4a5568',
                  fontSize: '1.2rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>Professional photography and videography solutions for every special moment</p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginBottom: '4rem'
              }}>
                {/* Service Cards */}
                <div className="service-card" style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: '#ff6b35',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>01</div>
                  <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Pre-Wedding Photography</h3>
                  <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>Romantic pre-wedding photography with cinematic 4K videography.</p>
                  <button onClick={() => handleNavigation('services')} style={{
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>View Details</button>
                </div>
                
                <div className="service-card" style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: '#ff6b35',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>02</div>
                  <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>Baby Photography</h3>
                  <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>Safe baby photography with gentle approaches for little ones.</p>
                  <button onClick={() => handleNavigation('services')} style={{
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>View Details</button>
                </div>
                
                <div className="service-card" style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: '#ff6b35',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>03</div>
                  <h3 style={{ color: '#1a365d', marginBottom: '1rem' }}>4K Videography</h3>
                  <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>Ultra HD video production with professional editing and grading.</p>
                  <button onClick={() => handleNavigation('services')} style={{
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>View Details</button>
                </div>
              </div>
              
              {/* Call to Action */}
              <div style={{
                textAlign: 'center',
                background: 'white',
                padding: '3rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ color: '#1a365d', marginBottom: '1rem', fontSize: '1.8rem' }}>Ready to capture your special moments?</h3>
                <p style={{ color: '#4a5568', marginBottom: '2rem', fontSize: '1.1rem' }}>Contact us today to discuss your photography and videography needs</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handleGetStarted} style={{
                    background: '#1a365d',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>Book a Session</button>
                  <button onClick={handleViewPortfolio} style={{
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>View Our Gallery</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Regular layout for other pages
        <>
          {/* Simple Header for Other Pages */}
          <div style={{
            padding: '2rem 3rem 1rem',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <h2 style={{
                margin: 0,
                cursor: 'pointer',
                fontSize: '1.8rem',
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: '700',
                color: '#1a365d',
                letterSpacing: '-0.5px'
              }} onClick={() => handleNavigation('home')}>Sri Sai Digital Photo Studio</h2>
              
              <button 
                onClick={() => handleNavigation('home')}
                style={{
                  background: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                ← Back to Home
              </button>
            </div>
          </div>
          
          <main style={{ minHeight: 'calc(100vh - 120px)', background: '#f8fafc' }}>
            {renderContent()}
          </main>
        </>
      )}
    </div>
  )
}

export default App
