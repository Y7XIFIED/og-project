import { motion } from 'framer-motion';
import { ArrowUp, Activity, Cpu, Coffee } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import footerImage from '../../assets/footer.png';

const SystemStatus = () => {
  const [cpu, setCpu] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30) + 70);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-xs font-mono text-white/50 border border-white/10 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md liquid-glass">
      <div className="flex items-center gap-2">
        <Cpu size={14} />
        <span>BRAIN CPU: {cpu}%</span>
      </div>
      <div className="w-px h-4 bg-white/10" />
      <div className="flex items-center gap-2">
        <Activity size={14} className="text-y7x-accent animate-pulse" />
        <span>MOTIVATION: HIGH</span>
      </div>
    </div>
  );
};

type FooterProps = {
  onCoffeeClick?: () => void;
  onHeightChange?: (height: number) => void;
};

export default function Footer({ onCoffeeClick, onHeightChange }: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!onHeightChange || !footerRef.current) return;

    const footer = footerRef.current;

    const reportHeight = () => {
      onHeightChange(footer.offsetHeight);
    };

    reportHeight();

    const resizeObserver = new ResizeObserver(reportHeight);
    resizeObserver.observe(footer);
    window.addEventListener('resize', reportHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', reportHeight);
    };
  }, [onHeightChange]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="status"
      className="fixed bottom-0 left-0 w-full bg-black/95 text-white px-6 md:px-12 py-16 md:py-20 border-t border-white/10 z-0 min-h-[680px] flex flex-col justify-end"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl w-full mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-y7x-accent liquid-glass">
              Status
            </span>
            <div className="text-xl md:text-2xl font-light space-y-2 font-mono">
              <p>Currently exploring tech.</p>
              <p className="text-white/50">Accidentally learning things.</p>
              <p className="text-y7x-accent text-sm mt-2 animate-pulse">&gt; Probably tweaking something right now_</p>
            </div>

            <SystemStatus />
          </div>

          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">Twitter</a>
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">LinkedIn</a>
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">GitHub</a>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/10 pt-8">
          <div className="text-xs text-white/40 font-mono flex items-center gap-4">
            <span>© 2026 Y7XIFIED. CHAOTICALLY LOGICAL.</span>
            <button onClick={onCoffeeClick} className="hover:text-y7x-accent transition-colors" title="Refill Coffee">
              <Coffee size={14} />
            </button>
            <span className="text-y7x-accent/70">? ? ?</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group hover:scale-110 active:scale-95 liquid-glass"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <h1 className="text-[12vw] leading-none font-black tracking-tight font-mono [font-variant-numeric:lining-nums] text-center md:text-left text-white/10 hover:text-white transition-all duration-700 cursor-default select-none">
            Y7XIFIED
          </h1>

          <img
            src={footerImage}
            alt="Footer visual"
            className="w-36 md:w-44 lg:w-52 h-auto object-contain opacity-90 self-center md:self-end"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </footer>
  );
}

