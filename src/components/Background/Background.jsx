import { useEffect, useRef } from 'react';

export default function Background() {
  const bgBaseRef = useRef(null);
  const sunGlowRef = useRef(null);
  const hazeRef = useRef(null);
  const desertFloorRef = useRef(null);
  const duneLayerRef = useRef(null);
  const pathLineRef = useRef(null);
  const desertWrapRef = useRef(null);
  const aboutAmbientRef = useRef(null);
  const aboutGridLinesRef = useRef(null);
  const planetArcRef = useRef(null);

  useEffect(() => {
    let req;
    let px = 0, py = 0, tx = 0, ty = 0;
    
    const onMouseMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let sy = window.scrollY || 0;
    let easedScroll = 0;

    const onScroll = () => {
      sy = window.scrollY;
    };

    const loop = () => {
      // Mouse Parallax easing
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      
      // Scroll easing calculation
      const progress = Math.min(Math.max(sy / window.innerHeight, 0), 1);
      easedScroll = progress < 0.5
        ? 4 * Math.pow(progress, 3)
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Smooth transformations mapping progress to visual transforms
      // Sun moves left and down, becoming part of the "About" portrait backlight
      const sunTranslateX = px * 30 - easedScroll * 300;
      const sunTranslateY = py * 20 + easedScroll * 200;
      const sunScale = 1 - easedScroll * 0.3;
      if (sunGlowRef.current) {
         sunGlowRef.current.style.transform = `translate(${sunTranslateX}px, ${sunTranslateY}px) scale(${sunScale})`;
      }

      // Planet shifts top left and sinks
      const planetTranslateX = px * 10 - easedScroll * 400;
      const planetTranslateY = py * 10 + easedScroll * 300;
      const planetScale = 1 + easedScroll * 0.5;
      if (planetArcRef.current) {
         planetArcRef.current.style.transform = `translate(${planetTranslateX}px, ${planetTranslateY}px) scale(${planetScale})`;
      }

      // Haze
      if (hazeRef.current) {
         hazeRef.current.style.transform = `translate(${px * 18}px, ${py * 12 + easedScroll * 150}px)`;
      }

      // Desert floor sinks completely down out of view
      const floorTranslateY = px * 10 + easedScroll * 400;
      const floorScaleY = Math.max(1 - easedScroll * 1.5, 0);
      if (desertFloorRef.current) {
         desertFloorRef.current.style.transform = `translate(${px * 10}px, ${floorTranslateY}px) scaleY(${floorScaleY})`;
      }

      // Dunes stretch and sink
      const duneTranslateY = py * 7 + easedScroll * 500;
      const duneScaleY = Math.max(1 - easedScroll * 1.2, 0);
      if (duneLayerRef.current) {
         duneLayerRef.current.style.transform = `translate(${px * 14}px, ${duneTranslateY}px) scaleY(${duneScaleY})`;
      }

      // Path flips backward and fades
      if (pathLineRef.current) {
        pathLineRef.current.style.transform = `translateX(calc(-50% + ${px * 8}px)) perspective(300px) rotateX(${60 + easedScroll * 40}deg)`;
        pathLineRef.current.style.opacity = Math.max(1 - easedScroll * 2.5, 0);
      }
      
      // We don't fade out desertWrap anymore, we just let elements morph
      // But we will slightly fade it so it blends nicely into the dark ambient
      if (desertWrapRef.current) {
        desertWrapRef.current.style.opacity = Math.max(1 - easedScroll * 0.4, 0.2);
      }

      // Fade in about ambient and grids
      if (aboutAmbientRef.current) aboutAmbientRef.current.style.opacity = easedScroll;
      if (aboutGridLinesRef.current) aboutGridLinesRef.current.style.opacity = easedScroll * 0.8;

      // Base Background Morphing
      const bx = 20 + px * -6, by = 60 + py * -6;
      const r1 = Math.round(58 - easedScroll * 50);
      const g1 = Math.round(26 - easedScroll * 22);
      const b1 = Math.round(5 - easedScroll * 3);
      const stop1 = `rgb(${r1},${g1},${b1})`;

      if (bgBaseRef.current) {
         bgBaseRef.current.style.background = `radial-gradient(ellipse 120% 80% at ${bx}% ${by}%, ${stop1} 0%, #0c0603 40%, #050302 100%)`;
      }
      
      req = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Jump-start sy initialization
    onScroll();
    loop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(req);
    };
  }, []);

  // Particles array
  const particles = Array.from({ length: 60 }).map((_, i) => {
    const s = Math.random() * 2 + 1;
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${s}px`,
      height: `${s}px`,
      '--dx': `${(Math.random() - .5) * 200}px`,
      '--dy': `${(Math.random() - .5) * 300}px`,
      animationDuration: `${4 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 6}s`,
      opacity: .3 + Math.random() * .5
    };
    return <div key={i} className="particle" style={style}></div>;
  });

  return (
    <div id="bg-canvas">
      <div className="bg-base" id="bgBase" ref={bgBaseRef}></div>

      {/* Desert world morphs instead of fading out */}
      <div className="desert-wrap" id="desertWrap" ref={desertWrapRef}>
        <div className="sun-glow" id="sunGlow" ref={sunGlowRef}></div>
        <div className="planet-arc" id="planetArc" ref={planetArcRef}></div>
        <div className="desert-floor" id="desertFloor" ref={desertFloorRef}></div>
        <div className="dune-layer" id="duneLayer" ref={duneLayerRef}></div>
        <div className="path-line" id="pathLine" ref={pathLineRef}></div>
        <div className="haze" id="haze" ref={hazeRef}></div>
        <div className="particles" id="particles">
          {particles}
        </div>
      </div>

      {/* About ambient (fades in) */}
      <div className="about-ambient" id="aboutAmbient" ref={aboutAmbientRef}></div>
      <div className="about-grid-lines" id="aboutGridLines" ref={aboutGridLinesRef}></div>

      <div className="vignette"></div>
      <div className="scanlines"></div>
    </div>
  );
}
