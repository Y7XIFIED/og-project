import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const GoofyFactsMarquee = () => {
  const facts = [
    'Has more unfinished ideas than finished snacks',
    'Trusts the process even when it is on fire',
    'Celebrates tiny wins like boss fights',
    'Names things dramatically for no reason',
    "Says 'just one more tweak' and vanishes for 2 hours",
    'Treats errors like riddles',
    'Laughs first, debugs later'
  ];

  return (
    <div className="relative flex overflow-hidden py-6 bg-y7x-light/70 border-y border-y7x-dark/10">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        className="flex whitespace-nowrap"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {facts.map((fact, index) => (
              <span key={index} className="text-xl md:text-2xl font-mono text-y7x-dark/50 mx-8 flex items-center">
                <span className="w-2 h-2 bg-y7x-accent rounded-full mr-4 inline-block" />
                {fact}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Philosophy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="logic" className="section-shell relative bg-y7x-light text-y7x-dark overflow-hidden px-3 md:px-7 lg:px-12 py-28 md:py-36">
      <div className="oversized-index !text-black/10">02</div>
      <GoofyFactsMarquee />

      <div ref={containerRef} className="px-4 md:px-12 py-20 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 border border-y7x-dark/20 rounded-full text-xs font-bold uppercase tracking-wider mb-8 bg-y7x-accent/20">
              The Logic (or lack thereof)
            </span>
            <h2 className="display-title heading-chromatic text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
              If it works, <span className="text-y7x-dark/30 line-through decoration-y7x-accent decoration-4">it is good</span>{' '}
              <span className="text-y7x-dark">it is suspicious.</span>
            </h2>
            <motion.div
              animate={{ y: [0, -6, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-[7rem] leading-none text-y7x-dark/15"
            >
              “
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y }}
            className="text-lg md:text-xl leading-relaxed space-y-8 pt-4 font-mono"
          >
            <div className="p-6 glass-card gradient-border rounded-xl hover:bg-white/50 transition-colors duration-300">
              <h3 className="font-bold mb-2">Rule #1</h3>
              <p>If it is broken, it is a learning opportunity. (Or a reason to cry, then learn).</p>
            </div>

            <div className="p-6 glass-card gradient-border rounded-xl hover:bg-white/50 transition-colors duration-300">
              <h3 className="font-bold mb-2">Rule #2</h3>
              <p>If it is confusing, it is interesting. Chaos is just undocumented features.</p>
            </div>

            <div className="p-6 glass-card gradient-border rounded-xl hover:bg-white/50 transition-colors duration-300">
              <h3 className="font-bold mb-2">Rule #3</h3>
              <p>Every problem is either a tech problem or will become one after I over-engineer it.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
