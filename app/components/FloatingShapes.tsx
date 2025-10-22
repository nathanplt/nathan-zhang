'use client';

import { useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;

      container.querySelectorAll('.shape-layer').forEach((layer, index) => {
        const depth = (index + 1) * 20;
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        (layer as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const layers = [
    { shapes: 3, size: 120, opacity: 0.08, speed: 30 },
    { shapes: 4, size: 80, opacity: 0.12, speed: 40 },
    { shapes: 5, size: 50, opacity: 0.15, speed: 50 },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(0, -40px) rotate(180deg);
          }
          75% {
            transform: translate(-20px, -20px) rotate(270deg);
          }
        }

        .shapes-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }

        .shape-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease-out;
        }

        .shape {
          position: absolute;
          border-radius: 8px;
          animation: drift ease-in-out infinite;
        }
      `}</style>

      <div ref={containerRef} className="shapes-container">
        {layers.map((layer, layerIndex) => (
          <div key={layerIndex} className="shape-layer">
            {Array.from({ length: layer.shapes }, (_, i) => {
              const rotation = (i / layer.shapes) * 360;
              const distance = 20 + layerIndex * 15;
              const x = 50 + Math.cos((rotation * Math.PI) / 180) * distance;
              const y = 50 + Math.sin((rotation * Math.PI) / 180) * distance;

              return (
                <div
                  key={i}
                  className="shape"
                  style={{
                    width: `${layer.size}px`,
                    height: `${layer.size}px`,
                    left: `${x}%`,
                    top: `${y}%`,
                    background: `linear-gradient(135deg, rgba(124, 107, 166, ${layer.opacity}), rgba(155, 138, 184, ${layer.opacity * 0.7}))`,
                    border: `1px solid rgba(124, 107, 166, ${layer.opacity * 2})`,
                    animationDuration: `${layer.speed}s`,
                    animationDelay: `${i * -layer.speed / layer.shapes}s`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
