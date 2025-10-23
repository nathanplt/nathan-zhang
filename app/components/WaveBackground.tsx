'use client';

import { useEffect, useRef } from 'react';

type Props = { reducedMotion?: boolean; staticMode?: boolean };

export default function WaveBackground({ reducedMotion = false, staticMode = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStaticRef = useRef<boolean>(staticMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 3.1;

    const resizeCanvas = () => {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let layer = 0; layer < 6; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124, 107, 166, ${0.09 - layer * 0.011})`;
        ctx.lineWidth = 2.5;

        const amplitude = (reducedMotion ? 26 : 36) + layer * (reducedMotion ? 9 : 12);
        const frequency = 0.0032 + layer * 0.0011;
        const yOffset = window.innerHeight * (0.30 + layer * 0.1);

        for (let x = 0; x < window.innerWidth; x += 5) {
          const y = yOffset + Math.sin(x * frequency + time + layer * 0.6) * amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!isStaticRef.current) {
        time += 0.01;
      }
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    isStaticRef.current = staticMode;
  }, [staticMode]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
