'use client';

import { useEffect, useRef } from 'react';

export default function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Firefly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      brightness: number;
      brightnessVel: number;
      size: number;
      phase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.brightness = Math.random();
        this.brightnessVel = 0.01 + Math.random() * 0.02;
        this.size = 2 + Math.random() * 2;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        // Wandering movement
        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;

        // Limit velocity
        const maxVel = 1;
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel;
          this.vy = (this.vy / vel) * maxVel;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Pulsing brightness
        this.phase += this.brightnessVel;
        this.brightness = (Math.sin(this.phase) + 1) / 2;
      }

      draw() {
        if (!ctx) return;

        const alpha = this.brightness * 0.5;

        // Large outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 8);
        gradient.addColorStop(0, `rgba(155, 138, 184, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(124, 107, 166, ${alpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(200, 180, 220, ${alpha * 1.2})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const fireflies = Array.from({ length: 50 }, () => new Firefly());

    const animate = () => {
      ctx.fillStyle = 'rgba(253, 252, 254, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = '#fdfcfe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
