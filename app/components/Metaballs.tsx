'use client';

import { useEffect, useRef } from 'react';

export default function Metaballs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = 60 + Math.random() * 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
    }

    const balls = Array.from({ length: 4 }, () => new Ball());

    const animate = () => {
      // Clear with white
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update balls
      balls.forEach(ball => ball.update());

      // Create metaball effect
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          let sum = 0;

          balls.forEach(ball => {
            const dx = x - ball.x;
            const dy = y - ball.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            sum += (ball.radius * ball.radius) / (dist * dist);
          });

          if (sum > 1) {
            const threshold = Math.min(sum - 1, 1);
            const alpha = threshold * 0.15;

            const index = (y * canvas.width + x) * 4;
            data[index] = 124;     // R
            data[index + 1] = 107; // G
            data[index + 2] = 166; // B
            data[index + 3] = alpha * 255; // A

            // Fill 2x2 block for performance
            if (x + 1 < canvas.width) {
              const i2 = (y * canvas.width + (x + 1)) * 4;
              data[i2] = 124;
              data[i2 + 1] = 107;
              data[i2 + 2] = 166;
              data[i2 + 3] = alpha * 255;
            }
            if (y + 1 < canvas.height) {
              const i3 = ((y + 1) * canvas.width + x) * 4;
              data[i3] = 124;
              data[i3 + 1] = 107;
              data[i3 + 2] = 166;
              data[i3 + 3] = alpha * 255;

              if (x + 1 < canvas.width) {
                const i4 = ((y + 1) * canvas.width + (x + 1)) * 4;
                data[i4] = 124;
                data[i4 + 1] = 107;
                data[i4 + 2] = 166;
                data[i4 + 3] = alpha * 255;
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

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
