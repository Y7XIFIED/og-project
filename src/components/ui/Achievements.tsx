import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
}

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<Achievement[]>([]);
  const [queue, setQueue] = useState<Achievement[]>([]);

  const unlock = (achievement: Achievement) => {
    // Check if already unlocked in session
    if (unlocked.find(a => a.id === achievement.id)) return;
    
    setUnlocked(prev => [...prev, achievement]);
    setQueue(prev => [...prev, achievement]);
    
    // Remove from queue after delay
    setTimeout(() => {
      setQueue(prev => prev.filter(a => a.id !== achievement.id));
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        unlock({ id: 'scroller', title: 'Doom Scroller', description: 'You scrolled past 1000px!' });
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const handleKonami = () => {
       unlock({ id: 'hacker', title: 'Hacker Man', description: 'You found the secret mode.' });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('konami-activated', handleKonami); // Custom event from hook if I added it

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('konami-activated', handleKonami);
    };
  }, [unlocked]);

  return (
    <div className="fixed bottom-8 right-8 z-[10000] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {queue.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-black/90 border border-y7x-accent text-white p-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]"
          >
            <div className="p-2 bg-y7x-accent/20 rounded-full text-y7x-accent">
              <Trophy size={20} />
            </div>
            <div>
              <h4 className="font-bold text-y7x-accent text-sm uppercase tracking-wider">Achievement Unlocked</h4>
              <p className="font-bold">{achievement.title}</p>
              <p className="text-xs text-white/60">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
