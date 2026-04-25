import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lightbulb, Bug, Zap, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

const traits = [
  {
    id: '03',
    title: 'Curiosity',
    description: 'Runs on late-night ideas, random what-if thoughts, and the urge to poke systems.',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    badge: 'RISK SEEKER'
  },
  {
    id: '04',
    title: 'Debugging',
    description: 'Laughs first, debugs later. Finds unreasonable joy in fixing gnarly edges.',
    icon: Bug,
    color: 'from-red-500 to-pink-500',
    badge: 'ERROR HUNTER'
  },
  {
    id: '05',
    title: 'Automation',
    description: 'Will spend 3 hours automating a 30-second task because that is the fun part.',
    icon: Zap,
    color: 'from-blue-400 to-cyan-400',
    badge: 'SYSTEM TUNER'
  }
];

export default function Traits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - 150);
      mouseY.set(e.clientY - rect.top - 100);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="playground"
      className="section-shell relative min-h-screen bg-y7x-dark text-white px-4 md:px-14 lg:px-20 py-28 overflow-hidden"
    >
      <div className="oversized-index">03</div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-8 text-y7x-accent liquid-glass">
            Core Traits
          </span>
          <h2 className="display-title heading-chromatic text-5xl md:text-7xl font-medium tracking-tight">
            Chaotically <br /> <span className="text-white/40">Logical.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.id}
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.06, zIndex: 50 }}
              whileHover={{ rotateX: -4, rotateY: 6 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.18 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group glass-card gradient-border p-8 rounded-2xl hover:border-y7x-accent transition-colors duration-500 relative cursor-grab active:cursor-grabbing"
            >
              <span className="absolute left-3 top-3 text-white/35">+</span>
              <span className="absolute right-3 top-3 text-white/35">+</span>
              <span className="absolute left-3 bottom-3 text-white/35">+</span>
              <span className="absolute right-3 bottom-3 text-white/35">+</span>

              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-mono text-white/50">{trait.id}.</span>
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-y7x-accent group-hover:text-black transition-colors duration-500">
                  <trait.icon size={24} />
                </div>
              </div>

              <div className="inline-block mb-4 px-2 py-1 rounded-full text-[10px] tracking-widest bg-gradient-to-r from-[#95ffc2] to-[#7eb5ff] text-black font-bold">
                {trait.badge}
              </div>

              <h3 className="text-2xl font-medium mb-4">{trait.title}</h3>
              <p className="text-white/70 leading-relaxed mb-8 min-h-[80px]">{trait.description}</p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-y7x-accent">
                <span>Drag Me</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        style={{
          x,
          y,
          rotateX,
          rotateY,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8
        }}
        className="absolute top-0 left-0 w-[300px] h-[200px] rounded-xl pointer-events-none z-0 overflow-hidden mix-blend-screen"
      >
        {hoveredIndex !== null && (
          <div className={`w-full h-full bg-gradient-to-br ${traits[hoveredIndex].color} opacity-80 blur-xl`} />
        )}
      </motion.div>
    </section>
  );
}
