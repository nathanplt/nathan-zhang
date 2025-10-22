'use client';

import { useEffect, useRef } from 'react';

export default function GradientShift() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.005;

      // Animated gradient position
      const x1 = (Math.sin(time) * 0.3 + 0.5) * canvas.width;
      const y1 = (Math.cos(time * 0.7) * 0.3 + 0.5) * canvas.height;
      const x2 = (Math.sin(time + Math.PI) * 0.3 + 0.5) * canvas.width;
      const y2 = (Math.cos(time * 0.7 + Math.PI) * 0.3 + 0.5) * canvas.height;

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, '#fdfcfe');
      gradient.addColorStop(0.5, '#f8f6fb');
      gradient.addColorStop(1, '#fdfcfe');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
