import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Spotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen"
      style={{
        background: `radial-gradient(560px at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 242, 104, 0.07), transparent 78%), radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(126,181,255,0.05), transparent 85%)`
      }}
    />
  );
}
