import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const GlitchText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className="inline-block cursor-default">
      {displayText}
    </span>
  );
};

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30 + Math.random() * 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(40);
  const lastXRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const triggerPhysics = () => {
    window.dispatchEvent(new CustomEvent('trigger-physics'));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const velocity = Math.min(240, Math.abs(e.clientX - lastXRef.current) * 5);
      setUnderlineWidth(40 + velocity);
      lastXRef.current = e.clientX;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={containerRef} className="section-shell relative min-h-screen flex flex-col justify-center px-5 md:px-14 lg:px-20 pt-24 pb-20 bg-y7x-dark text-white overflow-hidden">
      <div className="oversized-index">01</div>
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl w-full mx-auto pt-20 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 data-outline="Y7XIFIED" className="heading-outline heading-chromatic text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.9] mb-8">
            <GlitchText text="Y7XIFIED" />
            <br />
            <span className="block mt-5 text-3xl md:text-5xl">
              <span className="text-y7x-accent">Chaos</span>
              <span className="text-white/35"> // </span>
              <span className="text-[#8bb4ff]">Precision</span>
            </span>
            <span className="text-white/40 text-sm md:text-base font-mono block mt-4 tracking-widest">
              &gt; root@y7xified:~$ ./init_core.sh --force
            </span>
          </h1>
          <motion.div
            className="h-[3px] rounded-full bg-gradient-to-r from-y7x-accent via-[#8bb4ff] to-transparent"
            animate={{ width: underlineWidth }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mt-12 min-h-[120px]"
        >
          <p className="text-xl md:text-3xl leading-relaxed text-white/80 font-mono">
            <TypewriterEffect text="Turning caffeine into code and chaos." />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-12 right-6 md:right-12"
        >
          <button 
            onClick={triggerPhysics}
            className="group cta-sweep gradient-border glass-card flex items-center gap-3 hover:bg-y7x-accent hover:text-black px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="text-xs font-bold tracking-widest uppercase">Poke the System</span>
            <div className="bg-y7x-accent group-hover:bg-black text-black group-hover:text-white p-1 rounded-full transition-colors duration-300">
              <Terminal size={16} />
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-y7x-accent/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ rotate: haloRotate }}
        className="absolute -top-28 -left-24 w-80 h-80 rounded-full border border-white/15 bg-[radial-gradient(circle,rgba(212,242,104,0.25)_0%,transparent_62%)]"
      />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
            style={{ left: `${10 + i * 9}%`, top: `${15 + (i % 4) * 12}%` }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </section>
  );
}
