import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const gridSize = 40;
    const points: { x: number; y: number; originX: number; originY: number }[] = [];

    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        points.push({ x, y, originX: x, originY: y });
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const depth = Math.min(1, window.scrollY / (window.innerHeight * 1.8));
      ctx.strokeStyle = `rgba(126, 181, 255, ${0.02 + depth * 0.08})`;
      ctx.lineWidth = 1;

      points.forEach(point => {
        const dx = mouseX - point.originX;
        const dy = mouseY - point.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        const force = Math.max(0, (maxDistance - distance) / maxDistance);
        const angle = Math.atan2(dy, dx);

        point.x = point.originX + Math.cos(angle) * force * -20;
        point.y = point.originY + Math.sin(angle) * force * -20;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + depth * 0.12})`;
        ctx.fill();
      });

      // Draw lines (simplified for performance)
      // Actually, just drawing dots is cleaner and faster for "heavy load"
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="theme-background-layer absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70"
      />
    </div>
  );
}
