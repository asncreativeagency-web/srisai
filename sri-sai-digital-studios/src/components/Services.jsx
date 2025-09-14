import { useEffect, useRef } from 'react'
import { Monitor, Smartphone, Palette, Search, ShoppingCart, Camera } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Services = () => {
  const servicesRef = useRef(null)

  const services = [
    {
      icon: <Monitor size={40} />,
      title: 'Web Design & Development',
      description: 'Custom websites that are responsive, fast, and optimized for conversions.',
      features: ['Responsive Design', 'Custom Development', 'CMS Integration', 'Performance Optimization']
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['iOS Development', 'Android Development', 'React Native', 'UI/UX Design']
    },
    {
      icon: <Palette size={40} />,
      title: 'Brand Identity & Design',
      description: 'Complete branding solutions from logo design to brand guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Marketing Materials']
    },
    {
      icon: <Search size={40} />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'PPC Campaigns']
    },
    {
      icon: <ShoppingCart size={40} />,
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores with secure payment integration.',
      features: ['Shopify Development', 'WooCommerce', 'Payment Integration', 'Inventory Management']
    },
    {
      icon: <Camera size={40} />,
      title: 'Photography & Video',
      description: 'Professional photography and video production for your brand.',
      features: ['Product Photography', 'Corporate Videos', 'Social Media Content', 'Event Coverage']
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate service cards
    gsap.fromTo('.service-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Hover animations for service cards
    const serviceCards = document.querySelectorAll('.service-card')
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
      })
    })
  }, [])

  return (
    <section className="services" ref={servicesRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p className="section-subtitle">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="service-btn">Learn More</button>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Ready to start your project?</h3>
          <p>Let's discuss how we can help bring your vision to life</p>
          <button className="btn btn-primary">Get Free Consultation</button>
        </div>
      </div>
    </section>
  )
}

export default Services