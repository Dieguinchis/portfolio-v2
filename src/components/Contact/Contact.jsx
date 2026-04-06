import { useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    const revealEls = containerRef.current?.querySelectorAll('.reveal, .reveal-left');
    if (revealEls) revealEls.forEach(el => observer.observe(el));

    return () => {
      if (revealEls) revealEls.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: integrate with EmailJS, Formspree, etc.
    alert('¡Mensaje enviado! (Integrar servicio de correo)');
  };

  return (
    <section id="contacto" ref={containerRef}>
      <div className="section-thread" />

      {/* ── Header ── */}
      <div className="contact-header reveal">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Comunicación Directa</p>
        <h2 className="about-title">Hablemos de tu <span>Proyecto</span></h2>
      </div>

      <div className="contact-grid">
        {/* ── Left: Info ── */}
        <div className="contact-info reveal-left">
          <p className="contact-intro">
            Estoy disponible para <strong>proyectos freelance</strong> o colaboraciones. Si tenés una idea en mente, buscás potenciar tu <strong>presencia digital</strong> o simplemente necesitás asesoramiento técnico en <strong>desarrollo frontend</strong> con las últimas tecnologías, no dudes en escribirme. Me apasiona transformar conceptos complejos en <strong>interfaces intuitivas y memorables</strong>.
          </p>

          {/* Contact Cards */}
          <div className="contact-channels">
            <a href="mailto:tu@email.com" className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Correo Electrónico</span>
                <span className="contact-card-value">diego.colmenares.dev@gmail.com</span>
              </div>
            </a>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Ubicación</span>
                <span className="contact-card-value">Argentina</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-socials">
            <a href="https://github.com/Dieguinchis" target="_blank" rel="noopener noreferrer" className="social-link github" aria-label="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/diego-d-colmenares/" target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0z"/></svg>
            </a>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="contact-form-wrap reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="form-corner tl" />
          <div className="form-corner tr" />
          <div className="form-corner bl" />
          <div className="form-corner br" />

          <p className="form-title">Formulario de Contacto</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Nombre</label>
                <input id="contact-name" className="form-input" type="text" placeholder="Tu nombre" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Correo</label>
                <input id="contact-email" className="form-input" type="email" placeholder="tu@email.com" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Asunto</label>
              <input id="contact-subject" className="form-input" type="text" placeholder="¿En qué puedo ayudarte?" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Mensaje</label>
              <textarea id="contact-message" className="form-textarea" placeholder="Describe tu proyecto o idea..." required />
            </div>

            <button type="submit" className="form-submit">
              Enviar Mensaje
              <svg viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
