import { useState, useEffect, useRef } from 'react';
import './Services.css';

const servicesData = [
  { id: 1, title: 'Desarrollo Web', desc: 'Diseño y desarrollo aplicaciones web modernas, funcionales y escalables, enfocadas en rendimiento, usabilidad y buenas prácticas.', icon: '💻' },
  { id: 2, title: 'Diseño UI/UX', desc: 'Creo interfaces claras, atractivas y fáciles de usar, priorizando la experiencia del usuario, accesibilidad y diseño responsive.', icon: '🎨' },
  { id: 3, title: 'Experiencias Interactivas', desc: 'Desarrollo funcionalidades interactivas que mejoran la experiencia del usuario y optimizan el funcionamiento de productos digitales.', icon: '✨' },
  { id: 4, title: 'Trabajo en Equipo', desc: 'Participo en proyectos colaborativos aplicando buenas prácticas, control de versiones y comunicación efectiva para lograr productos de calidad.', icon: '🤝' },
];

/* ====== FUSION: THE VAULT NETWORK ====== */
export function ServicesDesignFusion1() {
  return (
    <div className="srv-fusion-1 reveal">
      <div className="f1-main-drop"><div className="f1-main-flow"></div></div>
      <div className="f1-bus"><div className="f1-flow"></div></div>
      <div className="f1-nodes">
        {servicesData.map((srv, idx) => (
          <div key={srv.id} className="f1-node-wrap">
            <div className="f1-drop-line"><div className="f1-drop-flow" style={{ animationDelay: `${idx * 0.4 + 1.2}s` }}></div></div>
            
            <div className="f3-tarot-machine" style={{ animationDelay: `${idx * 0.4 + 1.6}s` }}>
               <div className="f3-spine"><div className="f3-spine-glow" style={{ animationDelay: `${idx * 0.4 + 2.0}s` }}></div></div>
               
               <div className="f3-tarot-border">
                  <div className="f3-mini-vault">
                     <div className="f3-mini-door top" style={{ transitionDelay: `${idx * 0.4 + 2.2}s` }}></div>
                     <div className="f3-mini-door bottom" style={{ transitionDelay: `${idx * 0.4 + 2.2}s` }}></div>
                     <div className="f3-mini-icon" style={{ transitionDelay: `${idx * 0.4 + 2.5}s` }}>{srv.icon}</div>
                  </div>
                  
                  <h3 className="srv-title" style={{marginTop:'30px', fontSize:'18px'}}>{srv.title}</h3>
                  <p className="srv-desc" style={{fontSize:'13px', marginTop:'15px'}}>{srv.desc}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
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

    const revealEls = containerRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-line');
    if (revealEls) revealEls.forEach(el => observer.observe(el));

    return () => {
      if (revealEls) revealEls.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="servicios" ref={containerRef} style={{ position: 'relative', zIndex: 10, padding: '100px 40px', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="section-thread"></div>
      
      <div className="srv-header reveal" style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Inmersión & Destreza</p>
        <h2 className="about-title">Mis <span>Servicios</span></h2>
      </div>
      
      <ServicesDesignFusion1 />
    </section>
  );
}
