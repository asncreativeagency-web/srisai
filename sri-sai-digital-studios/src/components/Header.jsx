import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo('.header', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h2>Sri Sai <span>Digital Studios</span></h2>
          </Link>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Portfolio</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header