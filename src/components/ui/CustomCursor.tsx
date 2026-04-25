import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'button' | 'text'>('default');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        setCursorType('button');
      } else if (target.tagName === 'A' || target.closest('a')) {
        setCursorType('link');
      } else if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const size = cursorType === 'button' ? 36 : cursorType === 'link' ? 28 : cursorType === 'text' ? 22 : 16;
  const tone = cursorType === 'button' ? 'bg-[#8bb4ff]' : cursorType === 'link' ? 'bg-y7x-accent' : 'bg-white';

  return (
    <motion.div
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference ${tone}`}
      animate={{
        x: mousePosition.x - size / 2,
        y: mousePosition.y - size / 2,
        width: size,
        height: size,
        opacity: cursorType === 'text' ? 0.75 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  );
}
