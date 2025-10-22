'use client';

import { useEffect, useRef } from 'react';

export default function OrbitalSystem() {
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

    class Orbit {
      centerX: number;
      centerY: number;
      radius: number;
      speed: number;
      angle: number;
      orbitRadius: number;
      color: string;

      constructor(centerX: number, centerY: number, orbitRadius: number, speed: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.orbitRadius = orbitRadius;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 3;
        this.color = 'rgba(124, 107, 166, 0.6)';
      }

      update() {
        this.angle += this.speed;
      }

      draw() {
        if (!ctx) return;

        const x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        const y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        // Draw orbit path
        ctx.strokeStyle = 'rgba(124, 107, 166, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw orbiting object
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius * 3);
        gradient.addColorStop(0, 'rgba(124, 107, 166, 0.2)');
        gradient.addColorStop(1, 'rgba(124, 107, 166, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create orbital systems
    const systems: Orbit[] = [];
    const numSystems = 4;

    for (let i = 0; i < numSystems; i++) {
      const centerX = (Math.random() * 0.6 + 0.2) * canvas.width;
      const centerY = (Math.random() * 0.6 + 0.2) * canvas.height;
      const orbitsPerSystem = 2 + Math.floor(Math.random() * 2);

      for (let j = 0; j < orbitsPerSystem; j++) {
        const orbitRadius = 60 + j * 40;
        const speed = 0.002 + Math.random() * 0.002;
        systems.push(new Orbit(centerX, centerY, orbitRadius, speed));
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(253, 252, 254, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      systems.forEach(orbit => {
        orbit.update();
        orbit.draw();
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
