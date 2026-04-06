import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { projectsData } from '../../data/projects';
import { techMetadata } from '../../data/tech-metadata';
import './Projects.css';

/* ─── Shared: Tech Badge with real logo ─── */
const TechBadge = ({ tech, size = 16 }) => {
  // If tech is a string, resolve it using metadata
  const data = typeof tech === 'string' 
    ? (techMetadata[tech] || { logo: techMetadata.default.logo, color: techMetadata.default.color, name: tech })
    : tech;
  
  const name = typeof tech === 'string' ? tech : tech.name;

  return (
    <span className="proj-tech-badge" style={{ '--tc': data.color }}>
      <img src={data.logo} alt={name} width={size} height={size} className="proj-tech-logo" />
      <span>{name}</span>
    </span>
  );
};

/* ─── Shared: Image with lazy load + scan effect ─── */
const ProjectImage = ({ src, alt, className = '', onClick }) => (
  <div className={`proj-img-wrap ${className} ${onClick ? 'clickable' : ''}`} onClick={onClick}>
    <img src={src} alt={alt} loading="lazy" className="proj-img" />
    <div className="proj-img-scan" />
    <div className="proj-img-glow" />
    <div className="proj-img-overlay">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </div>
  </div>
);

/* ─── Shared: Lightbox Component ─── */
const ProjectLightbox = ({ project, activeIdx, onClose, onPrev, onNext }) => {
  if (!project) return null;

  const content = (
    <div className="proj-lightbox-overlay" onClick={onClose}>
      <button className="proj-lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <button className="proj-lightbox-btn prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="proj-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={project.images[activeIdx]} 
          alt={`${project.title} - ${activeIdx + 1}`} 
          className="proj-lightbox-img" 
        />
        <div className="proj-lightbox-info">
          <span className="proj-lightbox-title">{project.title}</span>
          <span className="proj-lightbox-counter">{activeIdx + 1} / {project.images.length}</span>
        </div>
      </div>

      <button className="proj-lightbox-btn next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );

  return createPortal(content, document.body);
};

/* ════════════════════════════════════════════
   PROJECT CARD: "EXPEDIENTE" (Definitive)
   ════════════════════════════════════════════ */
const ProjectCard = ({ proj, idx, onImageClick }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isReverse = idx % 2 !== 0;

  // Auto-play feature
  useEffect(() => {
    if (!proj.images || proj.images.length <= 1 || !isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % proj.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [proj.images, isAutoPlaying]);

  const handleManualSelection = (index) => {
    setActiveImg(index);
    setIsAutoPlaying(false);
  };

  return (
    <article className={`d1-row reveal ${isReverse ? 'd1-reverse' : ''}`} style={{ transitionDelay: `${idx * 0.15}s` }}>
      {/* Visual Area */}
      <div className="d1-visual">
        <div className="d1-frame-corner tl" /><div className="d1-frame-corner tr" />
        <div className="d1-frame-corner bl" /><div className="d1-frame-corner br" />
        
        <ProjectImage 
          src={proj.images[activeImg]} 
          alt={proj.title} 
          onClick={() => onImageClick(proj, activeImg)} 
        />
        
        {/* Carousel UI: Diamond Decor */}
        {proj.images.length > 1 && (
          <div className="d1-carousel-decor">
            {proj.images.map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  className={`d1-diamond ${activeImg === i ? 'active' : ''}`} 
                  onClick={() => handleManualSelection(i)}
                />
                {i < proj.images.length - 1 && <div className="d1-diamond-line" />}
              </div>
            ))}
          </div>
        )}

        <div className="d1-year-tag">{proj.year}</div>
      </div>

      {/* Info */}
      <div className="d1-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <span className="d1-category">{proj.category}</span>
          
          <div className={`badge-d2-led ${proj.visibility}`}>
            <span className="led-dot"></span>
            <span className="led-text">{proj.visibility === 'private' ? 'SISTEMA CERRADO' : 'CÓDIGO ABIERTO'}</span>
          </div>
        </div>
        
        <h3 className="d1-title">{proj.title}</h3>
        <p className="d1-subtitle">{proj.subtitle}</p>
        <p className="d1-desc">{proj.description}</p>

        <div className="d1-tech-row">
          {proj.tech.map(t => <TechBadge key={t.name} tech={t} />)}
        </div>

        <div className="d1-links">
          <a href={proj.links.live} className="d1-link-btn primary" target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Ver Proyecto
          </a>
          {proj.visibility !== 'private' && (
            <a href={proj.links.github} className="d1-link-btn secondary" target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              Código
            </a>
          )}
        </div>
      </div>

      {/* Thread connector */}
      <div className="d1-thread" />
    </article>
  );
};

/* ════════════════════════════════════════════
   ROOT COMPONENT
   ════════════════════════════════════════════ */
export default function Projects() {
  const containerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { project, index }

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    const revealEls = containerRef.current?.querySelectorAll('.reveal');
    if (revealEls) revealEls.forEach(el => observer.observe(el));

    return () => {
      if (revealEls) revealEls.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [showAll]);

  // Keyboard controls
  useEffect(() => {
    if (!lightbox) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') nextLightboxImg();
      if (e.key === 'ArrowLeft') prevLightboxImg();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const openLightbox = (project, index) => {
    setLightbox({ project, index });
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = 'auto'; // Unlock scroll
  };

  const nextLightboxImg = () => {
    setLightbox(prev => {
      if (!prev) return null;
      const nextIdx = (prev.index + 1) % prev.project.images.length;
      return { ...prev, index: nextIdx };
    });
  };

  const prevLightboxImg = () => {
    setLightbox(prev => {
      if (!prev) return null;
      const prevIdx = (prev.index - 1 + prev.project.images.length) % prev.project.images.length;
      return { ...prev, index: prevIdx };
    });
  };

  const featuredProjects = projectsData.filter(p => p.featured);
  const defaultProjects = featuredProjects.length > 0 ? featuredProjects : projectsData.slice(0, 2);
  const displayProjects = showAll ? projectsData : defaultProjects;

  return (
    <section id="proyectos" ref={containerRef}>
      <div className="section-thread" />

      {/* ── Lightbox ── */}
      {lightbox && (
        <ProjectLightbox 
          project={lightbox.project}
          activeIdx={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevLightboxImg}
          onNext={nextLightboxImg}
        />
      )}

      {/* ── HEADER ── */}
      <div className="proj-header reveal">
        <p className="proj-eyebrow">Portafolio Especializado</p>
        <h2 className="proj-main-title">Proyectos <span>Destacados</span></h2>
      </div>

      <div className="d1-container">
        {displayProjects.map((proj, idx) => (
          <ProjectCard 
            key={proj.id} 
            proj={proj} 
            idx={idx} 
            onImageClick={openLightbox} 
          />
        ))}
      </div>

      {/* BOTÓN VER TODOS */}
      {!showAll && projectsData.length > displayProjects.length && (
        <div className="proj-view-all reveal">
          <div className="proj-view-all-line" />
          <button className="proj-view-all-btn" onClick={() => setShowAll(true)}>
            <span className="btn-diamond">◇</span>
            Explorar Archivo Completo
            <span className="btn-diamond">◇</span>
          </button>
          <div className="proj-view-all-line" />
        </div>
      )}
    </section>
  );
}
