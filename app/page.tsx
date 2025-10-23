'use client';

import { useState } from 'react';
import GridBackground from './backgrounds/GridBackground';
import WaveBackground from './backgrounds/WaveBackground';
import HexBackground from './backgrounds/HexBackground';
import VoronoiBackground from './backgrounds/VoronoiBackground';

type BackgroundType = 'grid' | 'wave' | 'hex' | 'voronoi' | 'none';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'projects'>('overview');
  const [background, setBackground] = useState<BackgroundType>('hex');
  const [animate, setAnimate] = useState<boolean>(false);

  const handleBackgroundChange = (newBackground: BackgroundType) => {
    setBackground(newBackground);
    if (newBackground === 'none') {
      setAnimate(false);
    }
  };

  const experiences = [
    {
      company: 'Capital One',
      role: 'Software Engineer Intern',
      period: 'Jun – Aug 2025',
      points: [
        'Rebuilt financial reporting pipeline with serverless AWS (Step Functions, Fargate)',
        'Developed ETL pipeline automating 500k monthly aggregations on $45M+ settlement data',
        'Centralized credit settlement data into S3 data lake for 5 enterprise merchants'
      ]
    },
    {
      company: 'Scale AI',
      role: 'Technical Advisor Intern - GenAI',
      period: 'Nov 2024 – Jun 2025',
      points: [
        'Improved frontier model\'s algorithmic reasoning through chain-of-thought analysis',
        'Authored 40+ step-by-step solutions for DP and graph problems to fine-tune models',
        'Documented 15+ failure modes to guide prompt templates and retraining'
      ]
    },
    {
      company: 'Code Ninjas',
      role: 'Software Engineer Intern',
      period: 'May – Jul 2024',
      points: [
        'Built data platform for 100+ students (React, Flask, MongoDB), replacing Excel tracker',
        'Reduced grading time from 60 to 5 mins/day with autofilled forms and dashboards',
        'Deployed homework submission portal with Gunicorn/Waitress for online grading'
      ]
    },
    {
      company: 'Blast AI',
      role: 'Machine Learning Researcher',
      period: 'Jun – Nov 2023',
      points: [
        'Developed LLM-based semantic code similarity model with fine-tuned embeddings',
        'Outperformed GPT-4 embeddings by 22% F1-score (94.3% accuracy on 45k programs)',
        'Co-authored research published in IEEE Xplore, presented at ICoABCD'
      ]
    }
  ];

  const projects = [
    {
      title: 'Low-Latency Messaging System',
      tech: 'C++, Boost.Asio, ZeroMQ, Concurrency',
      description: 'High-throughput pub/sub messaging system with thread-safe concurrent architecture using thread pools, async I/O, and atomic operations. Benchmarked at <1ms p99 latency.',
      github: 'https://github.com/nathanplt/pub-sub-system'
    },
    {
      title: 'Code Review Agent',
      tech: 'Python, FastAPI, Kafka, PostgreSQL, pgvector, Docker',
      description: 'PR review agent with GitHub Apps integration generating code-diff summaries and inline comments. Implements security detection and uses vector search with pgvector embeddings for pattern matching.',
      github: 'https://github.com/nathanplt/pr-review-agent'
    },
    {
      title: 'Locus (Meta AI Hackathon – 3rd Place)',
      tech: 'VR, Cesium API, Qwen-VL, Stable Diffusion, Python',
      description: 'AI-powered VR storyboarding tool for filmmakers to explore real-world locations and generate cinematic storyboards. Integrates image-to-text analysis, prompt optimization, and scene synthesis pipelines.',
      github: 'https://www.youtube.com/watch?v=YuX-z0hmIzI'
    },
    {
      title: 'Intelligent Document Search Engine',
      tech: 'Python, BM25, Sentence Transformers, FastAPI, PostgreSQL',
      description: 'Hybrid dense–sparse retrieval engine combining BM25 ranking with transformer embeddings. Supports semantic search, custom relevance scoring, and metadata filtering for fast document discovery.',
      github: 'https://github.com/nathanplt'
    },
    {
      title: 'Security Footage Analysis System',
      tech: 'Python, OpenCV, YOLOv8, FastAPI',
      description: 'Real-time computer vision pipeline for multi-camera video feeds, performing motion tracking, object detection, and automated event classification through RESTful APIs.',
      github: 'https://github.com/nathanplt'
    },
    {
      title: 'Bill-Splitting App',
      tech: 'React Native, Node.js, Express, PostgreSQL, AWS',
      description: 'Receipt parsing automation with AWS Textract OCR. Features QR tab sharing, payment integration (PayPal/Venmo), and loan tracking on a Node.js backend.',
      github: 'https://github.com/nathanplt/tab-share'
    }
  ];


  return (
    <>
      {background === 'wave' && <WaveBackground reducedMotion staticMode={!animate} />}
      {background === 'grid' && <GridBackground reducedMotion staticMode={!animate} />}
      {background === 'hex' && <HexBackground reducedMotion staticMode={!animate} />}
      {background === 'voronoi' && <VoronoiBackground reducedMotion staticMode={!animate} />}

      <nav
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 1000,
          fontSize: '15px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
        aria-label="Background controls"
      >
        {[
          { key: 'hex', label: 'hex' },
          { key: 'voronoi', label: 'voronoi' },
          { key: 'wave', label: 'wave' },
          { key: 'grid', label: 'grid' },
          { key: 'none', label: 'none' },
        ].map(({ key, label }, idx) => (
          <span key={key} style={{ display: 'flex', alignItems: 'center' }}>
            {idx > 0 && <span style={{ margin: '0 var(--space-1)', color: 'var(--gray-300)' }} aria-hidden="true">/</span>}
            <button
              onClick={() => handleBackgroundChange(key as BackgroundType)}
              aria-label={`Set background to ${label}`}
              aria-pressed={background === key}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--space-1) var(--space-1)',
                color: background === key ? 'var(--purple-500)' : 'var(--gray-500)',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '400',
                transition: 'color 0.2s ease',
                fontFamily: 'inherit',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--purple-500)';
              }}
              onMouseLeave={(e) => {
                if (background !== key) {
                  e.currentTarget.style.color = 'var(--gray-500)';
                }
              }}
            >
              {label}
            </button>
          </span>
        ))}
        <span style={{ margin: '0 var(--space-1)', color: 'var(--gray-300)' }} aria-hidden="true">·</span>
        <button
          onClick={() => {
            if (background !== 'none') {
              setAnimate(!animate);
            }
          }}
          aria-label={animate ? 'Pause animation' : 'Play animation'}
          aria-pressed={animate}
          disabled={background === 'none'}
          style={{
            background: 'none',
            border: 'none',
            padding: 'var(--space-1) var(--space-1)',
            color: background === 'none'
              ? 'var(--gray-300)'
              : animate
                ? 'var(--purple-500)'
                : 'var(--gray-500)',
            cursor: background === 'none' ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: '400',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            borderRadius: '2px',
            opacity: background === 'none' ? 0.4 : 1,
            textDecorationLine: animate && background !== 'none' ? 'underline' : 'none',
            textDecorationColor: 'var(--purple-500)',
            textUnderlineOffset: '3px',
            textDecorationThickness: '1px',
            width: '50px',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            if (background !== 'none') {
              e.currentTarget.style.color = 'var(--purple-500)';
            }
          }}
          onMouseLeave={(e) => {
            if (background !== 'none' && !animate) {
              e.currentTarget.style.color = 'var(--gray-500)';
            }
          }}
        >
          {animate ? 'pause' : 'play'}
        </button>
      </nav>

      <div className="container">
        <header>
          <h1>Nathan Zhang</h1>
          <p className="subtitle">Computer Science @ UCLA</p>
        </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <span className="separator" aria-hidden="true">/</span>
        <button
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <span className="separator" aria-hidden="true">/</span>
        <button
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <section className="about">
            <p>Focused on building low-latency systems and optimizing ML inference pipelines. Spent the past year working on distributed data infrastructure at <a href="https://www.capitalone.com" target="_blank" rel="noopener noreferrer" className="inline-link">Capital One</a> and fine-tuning reasoning models at <a href="https://scale.com" target="_blank" rel="noopener noreferrer" className="inline-link">Scale AI</a>. Currently exploring CUDA kernels for transformer inference, modern C++ concurrency patterns, and building AI agents for code analysis.</p>
            <p>Right now: reading <a href="https://en.wikipedia.org/wiki/Flowers_for_Algernon" target="_blank" rel="noopener noreferrer" className="inline-link">Flowers for Algernon</a> and rewatching the Harry Potter movies in prep for a Universal Studios vacation with my girlfriend!</p>
          </section>
        )}

        {activeTab === 'experience' && (
          <section className="experience">
            <div className="timeline">
              {experiences.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-header">
                    <h3>{exp.company}</h3>
                    <span className="period">{exp.period}</span>
                  </div>
                  <p className="role">{exp.role}</p>
                  <ul>
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="projects">
            <div className="project-grid">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-item"
                >
                  <h3>{project.title}</h3>
                  <p className="tech-stack">{project.tech}</p>
                  <p>{project.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer>
        <div className="footer-links">
          <a href="mailto:nlzhang@ucla.edu">email</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/nathan-zhang-718422269/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span>/</span>
          <a href="https://github.com/nathanplt" target="_blank" rel="noopener noreferrer">github</a>
        </div>
      </footer>
      </div>
    </>
  );
}
