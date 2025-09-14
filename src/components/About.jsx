import { useEffect, useRef } from 'react'
import { Users, Award, Clock, Heart } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const aboutRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate about content on scroll
    gsap.fromTo('.about-content > *',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animate stats counters
    const stats = document.querySelectorAll('.stat-number')
    stats.forEach((stat) => {
      const target = parseInt(stat.dataset.target)
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: function() {
          stat.innerHTML = Math.ceil(stat.innerHTML)
        }
      })
    })
  }, [])

  return (
    <section className="about" ref={aboutRef}>
      <div className="container">
        <div className="about-content">
          <div className="section-header">
            <h2>About Sri Sai Digital Studios</h2>
            <p className="section-subtitle">
              Your trusted partner in digital transformation
            </p>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <h3>Who We Are</h3>
              <p>
                Sri Sai Digital Studios is a forward-thinking digital agency dedicated to 
                creating exceptional digital experiences. We combine creativity with technology 
                to deliver solutions that not only look stunning but also drive real business results.
              </p>
              <p>
                Our team of passionate designers, developers, and strategists work collaboratively 
                to bring your vision to life. We believe in the power of good design and its 
                ability to transform businesses and connect with audiences.
              </p>
              
              <div className="about-features">
                <div className="feature">
                  <Users className="feature-icon" />
                  <div>
                    <h4>Expert Team</h4>
                    <p>Skilled professionals with years of experience</p>
                  </div>
                </div>
                <div className="feature">
                  <Award className="feature-icon" />
                  <div>
                    <h4>Award Winning</h4>
                    <p>Recognized for excellence in digital design</p>
                  </div>
                </div>
                <div className="feature">
                  <Clock className="feature-icon" />
                  <div>
                    <h4>On Time Delivery</h4>
                    <p>We respect deadlines and deliver on schedule</p>
                  </div>
                </div>
                <div className="feature">
                  <Heart className="feature-icon" />
                  <div>
                    <h4>Client Focused</h4>
                    <p>Your success is our primary motivation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-stats" ref={statsRef}>
              <div className="stat">
                <div className="stat-number" data-target="150">0</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number" data-target="98">0</div>
                <div className="stat-label">Client Satisfaction %</div>
              </div>
              <div className="stat">
                <div className="stat-number" data-target="75">0</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat">
                <div className="stat-number" data-target="5">0</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About