import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const nameLettersRef = useRef(null);

  useEffect(() => {
    if (!nameLettersRef.current) return;
    
    // Clear any existing letters (for React strict mode)
    nameLettersRef.current.innerHTML = '';
    
    'PORTFOLIO'.split('').forEach((ch, i) => {
      const el = document.createElement('span');
      el.className = 'name-letter';
      el.style.setProperty('--i', i);
      el.textContent = ch;
      nameLettersRef.current.appendChild(el);
    });
  }, []);

  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">Desarrollador Frontend</p>
        <h1 className="hero-title">
          Más allá<br />de los píxeles<br />vive el arte
        </h1>
        <p className="hero-sub">
          Construyendo experiencias digitales inmersivas donde el diseño se encuentra con la intención — un mundo cuidadosamente edificado a la vez.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Ver Proyectos</button>
          <a href="/Diego_Colmenares_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-cv">
            <span className="btn-cv-label">Ver CV</span>
            <span className="btn-cv-icon">
              <svg viewBox="0 0 24 24">
                <line x1="12" y1="3" x2="12" y2="15" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="5" y1="20" x2="19" y2="20" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="side-strip">
        <div className="line"></div>
        <a href="https://github.com/Dieguinchis" target="_blank" rel="noopener noreferrer" className="side-link">GitHub</a>
        <a href="https://www.linkedin.com/in/diego-d-colmenares/" target="_blank" rel="noopener noreferrer" className="side-link">LinkedIn</a>
        <div className="line"></div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-dot"></div>
      </div>

      <div className="bottom-name">
        <div className="name-letters" id="nameLetters" ref={nameLettersRef}></div>
      </div>
    </section>
  );
}
