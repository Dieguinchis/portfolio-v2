import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
          obs.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.12 });

    const revealEls = containerRef.current?.querySelectorAll('.reveal, .reveal-left');
    if (revealEls) {
      revealEls.forEach(el => observer.observe(el));
    }

    return () => {
      if (revealEls) {
        revealEls.forEach(el => observer.unobserve(el));
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section id="sobre-mi" ref={containerRef}>
      <div className="section-thread"></div>

      <div className="about-grid">

        {/* Portrait */}
        <div className="about-portrait reveal-left">
          <div className="portrait-wrap">
            <div className="portrait-ring-dash"></div>
            <div className="portrait-ring-outer"></div>

            <div className="portrait-circle" id="portraitCircle">
              <img src="/foto.png" alt="Diego Colmenares" className="portrait-img" />
            </div>

            <div className="stat-badge b1">
              <span className="stat-num">+2</span>
              <span className="stat-label">Años de exp.</span>
            </div>
            <div className="stat-badge b2">
              <span className="stat-num">+5</span>
              <span className="stat-label">Proyectos</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="about-content">
          <p className="about-eyebrow reveal" style={{ transitionDelay: '0.05s' }}>Sobre Mí</p>

          <h2 className="about-title reveal" style={{ transitionDelay: '0.15s' }}>
            Construyo<br />interfaces<br />que <span>hablan</span>
          </h2>

          <p className="about-bio reveal" style={{ transitionDelay: '0.25s' }}>
            Soy un <strong>desarrollador frontend</strong> con más de 2 años creando experiencias web que van más allá del código — interfaces que comunican, conectan y dejan huella. Me obsesiona la intersección entre la lógica del desarrollo y la precisión del diseño.
            <br /><br />
            Cada proyecto es una oportunidad de convertir ideas complejas en soluciones elegantes, accesibles y con identidad visual propia. No solo construyo webs: <strong>construyo presencias digitales.</strong>
          </p>

          <div className="about-cta reveal" style={{ transitionDelay: '0.35s' }}>
            <button className="btn-primary">Ver Proyectos</button>
            <a href="/Diego_Colmenares_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-cv">
              <span className="btn-cv-label">Ver CV</span>
              <span className="btn-cv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="3" x2="12" y2="15" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="5" y1="20" x2="19" y2="20" />
                </svg>
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
