import { motion } from 'framer-motion';

const techs = [
  'React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Node.js', 'Next.js', 'Three.js', 'Matter.js', 'Rust', 'Python', 'Docker', 'AWS', 'GraphQL'
];

const tags = ['currently exploring', 'aesthetic systems', 'motion physics', 'liquid glass', 'chaotic logic'];

export default function TechStack() {
  return (
    <div className="py-12 bg-black/70 border-y border-white/10 overflow-hidden relative z-10 section-shell">
      <div className="neon-sep mb-6" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
        className="flex whitespace-nowrap gap-16"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16">
            {techs.map((tech, index) => (
              <span key={index} className="text-2xl font-mono text-white/35 font-bold uppercase tracking-widest hover:text-y7x-accent transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
        className="mt-6 flex whitespace-nowrap gap-4"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {tags.map((tag, index) => (
              <span key={index} className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85">
                {tag}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
