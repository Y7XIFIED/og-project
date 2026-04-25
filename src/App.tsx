import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Traits from './components/Traits';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Noise from './components/ui/Noise';
import ScrollProgress from './components/ui/ScrollProgress';
import Preloader from './components/ui/Preloader';
import PhysicsOverlay from './components/ui/PhysicsOverlay';
import HackerMode from './components/ui/HackerMode';
import ClickParticles from './components/ui/ClickParticles';
import CoffeeMode from './components/ui/CoffeeMode';
import GridBackground from './components/ui/GridBackground';
import TerminalModal from './components/ui/TerminalModal';
import Spotlight from './components/ui/Spotlight';
import TechStack from './components/TechStack';
import CodeShowcase from './components/CodeShowcase';
import { useKonamiCode } from './hooks/useKonamiCode';

function App() {
  const [hackerMode, setHackerMode] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);
  const [footerHeight, setFooterHeight] = useState(600);
  const [monoMode, setMonoMode] = useState(false);

  useKonamiCode(() => {
    setHackerMode(prev => !prev);
  });

  useEffect(() => {
    console.log(
      "%c HELLO THERE! %c \n\nIf you're reading this, you're probably looking for bugs. \nGood news: I made them myself! \n\nWant to hire a chaotic good dev? \nEmail me: hello@y7xified.com",
      "background: #D4F268; color: #000; font-size: 24px; font-weight: bold; padding: 10px;",
      "color: #fff; font-size: 14px;"
    );

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    const ambient = hour >= 6 && hour < 12 ? 'morning' : hour < 18 ? 'day' : 'night';
    document.body.dataset.ambient = ambient;
    document.body.style.filter = monoMode ? 'grayscale(1) contrast(1.05)' : 'none';
  }, [monoMode]);

  return (
    <main className="vignette grain min-h-screen w-full overflow-x-hidden selection:bg-y7x-accent selection:text-black">
      <Preloader />
      <CustomCursor />
      <Noise />
      <ScrollProgress />
      <PhysicsOverlay />
      <HackerMode active={hackerMode} />
      <ClickParticles />
      <CoffeeMode active={coffeeMode} />
      <GridBackground />
      <TerminalModal />
      <Spotlight />
      <div className="sticky-rail hidden lg:block">Y7XIFIED VISUAL RAIL</div>
      
      <Navbar monoMode={monoMode} onToggleMono={() => setMonoMode(prev => !prev)} />
      
      {/* Content Wrapper for Footer Reveal */}
      <div
        className="relative z-10 shadow-2xl"
        style={{ marginBottom: `${footerHeight + 80}px` }}
      >
        <div className="floating-blob left-[8%] top-24 bg-[#84ffd6]" />
        <div className="floating-blob right-[5%] top-[32rem] bg-[#8bb4ff]" />
        <Hero />
        <div className="neon-sep" />
        <TechStack />
        <div className="neon-sep" />
        <Philosophy />
        <div className="neon-sep" />
        <CodeShowcase />
        <div className="neon-sep" />
        <Traits />
      </div>
      
      <Footer
        onCoffeeClick={() => setCoffeeMode(prev => !prev)}
        onHeightChange={setFooterHeight}
      />
    </main>
  );
}

export default App;
