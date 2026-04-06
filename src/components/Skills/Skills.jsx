import { useEffect, useRef } from 'react';
import { skillsData } from '../../data/skills';
import { techMetadata } from '../../data/tech-metadata';
import './Skills.css';

/* Helper: Real logo or emoji fallback */
const Logo = ({ sk, size = 22 }) => {
  const data = techMetadata[sk.name] || { logo: sk.logo, color: sk.color || techMetadata.default.color };
  
  return data.logo
    ? <img src={data.logo} alt={sk.name} className="skill-logo" style={{ width: size, height: size, filter: `drop-shadow(0 0 5px ${data.color}44)` }} />
    : <span>{sk.icon}</span>;
};

export default function Skills() {
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

    const revealEls = containerRef.current?.querySelectorAll('.reveal, .reveal-right');
    if (revealEls) revealEls.forEach(el => observer.observe(el));

    return () => {
      if (revealEls) revealEls.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const aiData = skillsData.find(d => d.id === 'ai');
  const baseSkills = skillsData.filter(d => d.id !== 'ai');

  return (
    <section id="habilidades" ref={containerRef}>
      <div className="section-thread"></div>

      <div className="skills-grid-layout">
        
        {/* TEXTO IZQUIERDO */}
        <div className="skills-info">
          <p className="skills-eyebrow reveal" style={{ transitionDelay: '0.05s' }}>Arsenal Técnico</p>
          <h2 className="skills-title reveal" style={{ transitionDelay: '0.15s' }}>
            Evolución y<br /><span>Stack</span>
          </h2>
          <p className="skills-description reveal" style={{ transitionDelay: '0.25s' }}>
            El desarrollo de software es una disciplina que exige <strong>evolución continua</strong>. Mi ecosistema crece cada día — investigo, experimento y adopto nuevas herramientas para mantener mi stack en la frontera de lo posible.
            <br /><br />
            La <strong>Inteligencia Artificial</strong> no es una herramienta más en mi stack — es el motor que potencia todo lo demás. Desde el análisis hasta la optimización del código, la IA amplifica mi capacidad para entregar soluciones de alto nivel en menos tiempo.
          </p>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="skills-content-right reveal-right">
          
          {/* BLOQUE IA OPTIMIZADORA COMPACTO */}
          <div className="ai-booster-block">
            <div className="ai-header-mini">
              <span className="ai-diamond">◇</span>
              <span className="ai-title">ASISTENTE DE OPTIMIZACIÓN</span>
              <span className="ai-diamond">◇</span>
            </div>
            <div className="ai-tools">
              {aiData.skills.map(sk => (
                <div key={sk.name} className="ai-tool-card">
                  <Logo sk={sk} size={18} />
                  <span>{sk.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SISTEMA DE CONEXIÓN */}
          <div className="ai-connectors">
             <div className="ai-bus-line"></div>
             <div className="ai-drops">
                <div className="ai-drop"><div className="ai-drop-flow" style={{ animationDelay: '0s' }}></div></div>
                <div className="ai-drop"><div className="ai-drop-flow" style={{ animationDelay: '0.5s' }}></div></div>
                <div className="ai-drop"><div className="ai-drop-flow" style={{ animationDelay: '1s' }}></div></div>
             </div>
             <span className="ai-action-text">Conectando y potenciando mi ecosistema</span>
          </div>

          {/* GRID DE TECNOLOGÍAS */}
          <div className="art-grid">
            {baseSkills.map(dataset => (
              <div key={dataset.id} className="art-col">
                <div className="art-col-title">{dataset.category}</div>
                <div className="art-items">
                  {dataset.skills.map(sk => (
                    <div key={sk.name} className="art-item">
                      <Logo sk={sk} size={24} />
                      <span>{sk.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* BADGE DE APRENDIZAJE CONSTANTE */}
          <div className="learning-badge">
            <div className="lb-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" className="lb-infinity-svg">
                <path
                  d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.739-8z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="lb-text">
              <span className="lb-title">En constante aprendizaje</span>
              <span className="lb-sub">Cada proyecto impulsa mi evolución</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
