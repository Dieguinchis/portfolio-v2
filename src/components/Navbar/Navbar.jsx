import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const t = document.querySelector(targetId);
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className={`scroll-progress ${scrolled ? 'visible' : ''}`}>
        <div 
          className="scroll-progress-bar" 
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      
      <div className="nav-container">
        <ul className="nav-links left-links">
          <li><a href="#inicio" onClick={(e) => handleScroll(e, '#inicio')}>Inicio</a></li>
          <li><a href="#sobre-mi" onClick={(e) => handleScroll(e, '#sobre-mi')}>Sobre Mí</a></li>
          <li><a href="#certificados" onClick={(e) => handleScroll(e, '#certificados')}>Certificados</a></li>
        </ul>

        <div className="nav-logo-wrap" aria-hidden="true">
          <div className="nav-logo-line"></div>
          <span className="nav-logo-text">Portfolio</span>
          <div className="nav-logo-line r"></div>
        </div>

        <ul className="nav-links right-links">
          <li><a href="#servicios" onClick={(e) => handleScroll(e, '#servicios')}>Servicios</a></li>
          <li><a href="#">Proyectos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
}
