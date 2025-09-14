import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Portfolio = () => {
  const portfolioRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'Modern e-commerce platform with seamless user experience',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      description: 'Secure and intuitive mobile banking application',
      technologies: ['React Native', 'Firebase', 'Biometric Auth'],
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Corporate Brand Identity',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1541411438265-4cb4687110ce?w=600&h=400&fit=crop',
      description: 'Complete brand identity for a tech startup',
      technologies: ['Illustrator', 'Photoshop', 'Figma'],
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'Restaurant Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      description: 'Elegant restaurant website with online reservation system',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'Fitness Tracking App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      description: 'Comprehensive fitness tracking and workout planning app',
      technologies: ['Flutter', 'Dart', 'SQLite'],
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Marketing Campaign',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Digital marketing campaign for product launch',
      technologies: ['After Effects', 'Premiere Pro', 'Photoshop'],
      link: '#',
      github: '#'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'branding', label: 'Branding' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate portfolio items
    gsap.fromTo('.portfolio-item',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Hover animations
    const portfolioItems = document.querySelectorAll('.portfolio-item')
    portfolioItems.forEach(item => {
      const overlay = item.querySelector('.portfolio-overlay')
      
      item.addEventListener('mouseenter', () => {
        gsap.to(overlay, { opacity: 1, duration: 0.3 })
        gsap.to(item.querySelector('.portfolio-image'), { scale: 1.1, duration: 0.3 })
      })
      
      item.addEventListener('mouseleave', () => {
        gsap.to(overlay, { opacity: 0, duration: 0.3 })
        gsap.to(item.querySelector('.portfolio-image'), { scale: 1, duration: 0.3 })
      })
    })
  }, [filteredProjects])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <section className="portfolio" ref={portfolioRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our Portfolio</h2>
          <p className="section-subtitle">
            Showcasing our best work and creative solutions
          </p>
        </div>

        <div className="portfolio-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="portfolio-tech">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio-links">
                      <a href={project.link} className="portfolio-link">
                        <ExternalLink size={16} />
                        View Project
                      </a>
                      <a href={project.github} className="portfolio-link">
                        <Github size={16} />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio