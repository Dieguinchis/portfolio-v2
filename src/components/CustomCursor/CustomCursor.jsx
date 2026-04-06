import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let req;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const cursorLoop = () => {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      req = requestAnimationFrame(cursorLoop);
    };

    const attachHoverEvents = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const handleMouseEnter = () => {
      if (!ring) return;
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(200,146,42,0.8)';
    };

    const handleMouseLeave = () => {
      if (!ring) return;
      ring.style.width = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(200,146,42,0.5)';
    };

    document.addEventListener('mousemove', onMouseMove);
    attachHoverEvents();
    cursorLoop();

    // Setup an observer to watch for new a/button tags added dynamically
    const observer = new MutationObserver((mutationsList, observer) => {
       // Just re-attach if children nodes were added
       let shouldReattach = false;
       for (let mutation of mutationsList) {
           if (mutation.type === 'childList') {
               shouldReattach = true;
               break;
           }
       }
       if (shouldReattach) {
           document.querySelectorAll('a, button').forEach(el => {
              el.removeEventListener('mouseenter', handleMouseEnter);
              el.removeEventListener('mouseleave', handleMouseLeave);
              el.addEventListener('mouseenter', handleMouseEnter);
              el.addEventListener('mouseleave', handleMouseLeave);
           });
       }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
      cancelAnimationFrame(req);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}></div>
    </>
  );
}
