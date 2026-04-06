import { useEffect, useRef } from 'react';
import { certificatesData } from '../../data/certificates';
import { techMetadata } from '../../data/tech-metadata';
import './Certificates.css';

/* 
  DISEÑO 4: Timeline Vertical tipo Constelación ANIMADO
*/
export function CertificatesDesign4() {
  return (
    <div className="cert-timeline">
      <div className="timeline-line reveal-line"></div>
      {certificatesData.map((cert, i) => {
        const techs = cert.tech || [cert.issuer];
        
        return (
          <div key={cert.id} className={`timeline-node-wrap ${i % 2 === 0 ? 'left reveal-left' : 'right reveal-right'}`}>
            <div className="timeline-node"></div>
            <a 
              href={cert.file || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cert-card-d4"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cert-icons-row">
                {techs.map(tName => {
                  const data = techMetadata[tName] || techMetadata.default;
                  return (
                    <div key={tName} className="cert-icon-wrap" style={{ '--sc': data.color }}>
                       {data.logo ? (
                         <img src={data.logo} alt={tName} className="cert-logo-img" />
                       ) : (
                         <span className="cert-emoji">{cert.icon}</span>
                       )}
                    </div>
                  );
                })}
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">Emitido por {cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default function Certificates() {
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
    <section id="certificados" ref={containerRef} style={{ position: 'relative', zIndex: 10, padding: '100px 40px', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="section-thread"></div>
      
      <div className="cert-header reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Logros & Aprendizaje</p>
        <h2 className="about-title">Mis <span>Certificados</span></h2>
      </div>

      <CertificatesDesign4 />

    </section>
  );
}
