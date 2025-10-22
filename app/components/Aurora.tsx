'use client';

import { useEffect, useRef } from 'react';

export default function Aurora() {
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

    class Wave {
      baseY: number;
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;

      constructor(baseY: number, amplitude: number, frequency: number, speed: number, color: string) {
        this.baseY = baseY;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
      }

      draw(time: number) {
        if (!ctx) return;

        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = this.baseY +
                    Math.sin(x * this.frequency + time * this.speed) * this.amplitude +
                    Math.sin(x * this.frequency * 0.5 + time * this.speed * 0.7) * this.amplitude * 0.5;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Complete the path for gradient fill
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(253, 252, 254, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const waves = [
      new Wave(canvas.height * 0.3, 80, 0.003, 0.5, 'rgba(155, 138, 184, 0.08)'),
      new Wave(canvas.height * 0.4, 60, 0.004, 0.7, 'rgba(124, 107, 166, 0.12)'),
      new Wave(canvas.height * 0.5, 70, 0.002, 0.6, 'rgba(155, 138, 184, 0.1)'),
      new Wave(canvas.height * 0.6, 50, 0.005, 0.8, 'rgba(124, 107, 166, 0.08)'),
    ];

    const animate = () => {
      ctx.fillStyle = '#fdfcfe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.5;

      waves.forEach(wave => wave.draw(time));

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
