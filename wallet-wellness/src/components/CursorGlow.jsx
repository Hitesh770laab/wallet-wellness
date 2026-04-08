import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const trailConfig = { damping: 40, stiffness: 150 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springTrailX = useSpring(trailX, trailConfig);
  const springTrailY = useSpring(trailY, trailConfig);

  const isHovering = useRef(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      trailX.set(e.clientX - 20);
      trailY.set(e.clientY - 20);
    };

    const handleHoverIn = () => { isHovering.current = true; };
    const handleHoverOut = () => { isHovering.current = false; };

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-glow"
        style={{
          x: springX,
          y: springY,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.9) 0%, rgba(96,165,250,0.3) 100%)',
          boxShadow: '0 0 12px rgba(167,139,250,0.6)',
        }}
      />
      {/* Outer glow ring */}
      <motion.div
        className="cursor-glow"
        style={{
          x: springTrailX,
          y: springTrailY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(167,139,250,0.3)',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />
    </>
  );
}
