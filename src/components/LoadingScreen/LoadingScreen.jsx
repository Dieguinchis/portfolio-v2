import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LETTERS = ['D', 'I', 'E', 'G', 'O'];
const DURATION = 1450; // Total loading time in ms

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();
    let raf;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / DURATION, 1);
      // Ease-out curve for smoother feel
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Finished — start exit animation
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onFinish(), 800);
        }, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  // How many letters are "lit" — based on progress
  const litCount = Math.floor(progress * LETTERS.length);
  // Fractional brightness for the "currently lighting" letter
  const partialBrightness = (progress * LETTERS.length) - litCount;

  return (
    <div className={`loading-screen ${exiting ? 'exit' : ''}`}>

      <div className="loading-content">
        <div className="loading-name">
          {LETTERS.map((letter, i) => {
            let opacity, textShadow, scale;

            if (i < litCount) {
              // Fully lit
              opacity = 1;
              textShadow = '0 0 30px rgba(200,146,42,0.8), 0 0 60px rgba(200,146,42,0.4)';
              scale = 1;
            } else if (i === litCount) {
              // Currently lighting up
              opacity = 0.15 + partialBrightness * 0.85;
              const glowIntensity = partialBrightness;
              textShadow = `0 0 ${30 * glowIntensity}px rgba(200,146,42,${0.8 * glowIntensity}), 0 0 ${60 * glowIntensity}px rgba(200,146,42,${0.4 * glowIntensity})`;
              scale = 0.95 + partialBrightness * 0.05;
            } else {
              // Not yet lit
              opacity = 0.12;
              textShadow = 'none';
              scale = 0.95;
            }

            return (
              <span
                key={i}
                className="loading-letter"
                style={{
                  opacity,
                  textShadow,
                  transform: `scale(${scale})`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="loading-bar-track">
          <div 
            className="loading-bar-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <span className="loading-percent">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
