import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `const Y7Xified = {
  status: 'Caffeinated',
  skills: ['Breaking things', 'Fixing things'],
  philosophy: () => {
    while (alive) {
      learn();
      create();
      sleep(optional);
    }
  }
};`;

export default function CodeShowcase() {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, i));
      i += 1;
      if (i > codeSnippet.length) clearInterval(interval);
    }, 42);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-shell py-24 bg-y7x-dark relative z-10 px-4 md:px-10 lg:px-16">
      <div className="oversized-index">04</div>
      <div className="max-w-4xl mx-auto">
        <div className="scanline glass-card gradient-border rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-white/50 font-mono">brain_dump.ts</span>
          </div>
          <div className="p-6 font-mono text-sm md:text-base text-gray-300 overflow-x-auto">
            <pre>
              <code>{displayedCode}<span className="animate-pulse text-y7x-accent">_</span></code>
            </pre>
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35], letterSpacing: ['0.15em', '0.22em', '0.15em'] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-center text-y7x-accent"
        >
          Live code pulse
        </motion.div>
      </div>
    </section>
  );
}
