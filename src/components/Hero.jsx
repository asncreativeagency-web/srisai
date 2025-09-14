import { useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import gsap from 'gsap'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Simple timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      if (titleRef.current && subtitleRef.current && ctaRef.current) {
        const tl = gsap.timeline()
        
        tl.fromTo(titleRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo(subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )

        // Floating animation for background elements
        gsap.to('.hero-bg-element', {
          y: -30,
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-bg-element"></div>
        <div className="hero-bg-element"></div>
        <div className="hero-bg-element"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            Creating Digital
            <span className="accent-text"> Experiences</span>
            <br />
            That Matter
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            We are a creative digital studio specializing in web design, branding, 
            and digital marketing solutions that elevate your business to new heights.
          </p>
          
          <div ref={ctaRef} className="hero-cta">
            <button className="btn btn-primary">
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">
              <Play size={16} />
              Watch Our Work
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-content">
              <div className="card-icon">💡</div>
              <h3>Creative Solutions</h3>
              <p>Innovative designs that captivate</p>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-content">
              <div className="card-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Quick turnaround times</p>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-content">
              <div className="card-icon">⭐</div>
              <h3>Premium Quality</h3>
              <p>Excellence in every pixel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero