'use client';

import { useEffect, useRef } from 'react';

type Props = { reducedMotion?: boolean; staticMode?: boolean };

export default function HexagonAnimated({ reducedMotion = false, staticMode = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStaticRef = useRef<boolean>(staticMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

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

    const size = 36;
    const height = size * Math.sqrt(3);

    const draw = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < canvas.height / height + 2; row++) {
        for (let col = 0; col < canvas.width / (size * 1.5) + 2; col++) {
          const x = col * size * 1.5;
          const y = row * height + (col % 2) * height / 2;

          // Distance-based animation
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const t = isStaticRef.current ? 2.6 : time;
          const wave = Math.sin(dist * 0.012 - t);
          const alpha = Math.max(0, wave) * (reducedMotion ? 0.12 : 0.16);

          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(124, 107, 166, ${alpha})`;
            ctx.beginPath();

            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const hx = x + size * Math.cos(angle);
              const hy = y + size * Math.sin(angle);

              if (i === 0) {
                ctx.moveTo(hx, hy);
              } else {
                ctx.lineTo(hx, hy);
              }
            }
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    };

    const animate = () => {
      if (!isStaticRef.current) {
        time += 0.024;
      }
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    isStaticRef.current = staticMode;
  }, [staticMode]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />;
}
