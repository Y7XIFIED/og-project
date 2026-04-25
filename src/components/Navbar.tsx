import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const MagneticLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="hover:opacity-70 transition-opacity hover:text-y7x-accent px-4 py-2"
    >
      {children}
    </motion.a>
  );
};

type NavbarProps = {
  monoMode: boolean;
  onToggleMono: () => void;
};

export default function Navbar({ monoMode, onToggleMono }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('playground');

  useEffect(() => {
    const sections = ['playground', 'logic', 'status'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 text-white"
    >
      <div className="flex flex-col liquid-glass px-4 py-2 rounded-xl">
        <div className="text-xl font-bold tracking-tight font-mono text-y7x-accent drop-shadow-[0_0_10px_rgba(212,242,104,0.5)]">
          &gt; Y7XIFIED_
        </div>
        <div className="text-[10px] font-mono text-white/60 tracking-widest animate-pulse">
          powered by Y7X
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-3 text-sm font-medium tracking-wide liquid-glass rounded-full px-3 py-2">
        <MagneticLink href="#playground"><span className={activeSection === 'playground' ? 'text-y7x-accent drop-shadow-[0_0_12px_rgba(212,242,104,0.6)]' : ''}>PLAYGROUND</span></MagneticLink>
        <MagneticLink href="#logic"><span className={activeSection === 'logic' ? 'text-y7x-accent drop-shadow-[0_0_12px_rgba(212,242,104,0.6)]' : ''}>LOGIC</span></MagneticLink>
        <MagneticLink href="#status"><span className={activeSection === 'status' ? 'text-y7x-accent drop-shadow-[0_0_12px_rgba(212,242,104,0.6)]' : ''}>STATUS</span></MagneticLink>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMono}
          className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full liquid-glass ${monoMode ? 'text-y7x-accent' : 'text-white/70'}`}
        >
          Mono
        </button>
        <a 
          href="#status"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300 cta-sweep liquid-glass"
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
}
