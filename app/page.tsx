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
  const [animate, setAnimate] = useState(false);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set());

  const handleBackgroundChange = (newBackground: BackgroundType) => {
    setBackground(newBackground);
    if (newBackground === 'none') {
      setAnimate(false);
    }
  };

  const toggleExperience = (index: number) => {
    setExpandedExperiences(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const experiences = [
    {
      company: 'UCLA ELFIN CubeSat',
      role: 'Ground Software Engineer',
      period: 'Oct 2025 – Present',
      link: 'https://elfin.igpp.ucla.edu/',
      linkColor: '#7c6ba6',
      points: [
        'Building multithreaded Python backend for UART communication with flight computer',
        'Implementing command dispatch with COBS packet encoding and ACK/timeout recovery',
        'Integrating ZeroMQ messaging to stream telemetry packets to GUI and ground database'
      ]
    },
    {
      company: 'Capital One',
      role: 'Software Engineer Intern',
      period: 'Jun – Aug 2025',
      link: 'https://www.capitalone.com',
      linkColor: '#7c6ba6',
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
      link: 'https://scale.com',
      linkColor: '#7c6ba6',
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
      link: 'https://www.codeninjas.com/nj-livingston',
      linkColor: '#7c6ba6',
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
      link: 'https://ieeexplore.ieee.org/document/10390981',
      linkColor: '#7c6ba6',
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

      <nav className="background-controls" aria-label="Background controls">
        {[
          { key: 'hex', label: 'hex' },
          { key: 'voronoi', label: 'voronoi' },
          { key: 'wave', label: 'wave' },
          { key: 'grid', label: 'grid' },
          { key: 'none', label: 'none' },
        ].map(({ key, label }, idx) => (
          <span key={key} className="background-controls-item">
            {idx > 0 && <span className="background-controls-separator" aria-hidden="true">/</span>}
            <button
              onClick={() => handleBackgroundChange(key as BackgroundType)}
              aria-label={`Set background to ${label}`}
              aria-pressed={background === key}
              className={`background-controls-button ${background === key ? 'active' : ''}`}
            >
              {label}
            </button>
          </span>
        ))}
        <button
          onClick={() => {
            if (background !== 'none') {
              setAnimate(!animate);
            }
          }}
          aria-label={animate ? 'Pause animation' : 'Play animation'}
          aria-pressed={animate}
          disabled={background === 'none'}
          className={`background-controls-play-button ${animate && background !== 'none' ? 'active' : ''}`}
        >
          {animate ? 'pause' : 'play'}
        </button>
      </nav>

      <div className="container">
        <header role="banner">
          <h1>Nathan Zhang</h1>
          <p className="subtitle">Computer Science @ UCLA</p>
        </header>

      <nav className="tabs" aria-label="Main navigation">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          aria-current={activeTab === 'overview' ? 'page' : undefined}
        >
          Overview
        </button>
        <span className="separator" aria-hidden="true">/</span>
        <button
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
          aria-current={activeTab === 'experience' ? 'page' : undefined}
        >
          Experience
        </button>
        <span className="separator" aria-hidden="true">/</span>
        <button
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
          aria-current={activeTab === 'projects' ? 'page' : undefined}
        >
          Projects
        </button>
      </nav>

      <main className="tab-content" role="main">
        {activeTab === 'overview' && (
          <section className="about">
            <p>Hey! I'm a CS undergrad at UCLA w/ roots in NJ. I'm broadly interested in computer systems and making things fast - right now, studying C++, parallel & distributed computing, and AI inference. If you've got good resources or interesting projects, please reach out!</p>
            <p>I'll be joining <a href="https://www.citadel.com/" target="_blank" rel="noopener noreferrer" className="inline-link">Citadel</a> as a SWE intern for Summer 2026. Previously, I worked on data infrastructure at <a href="https://www.capitalone.com" target="_blank" rel="noopener noreferrer" className="inline-link">Capital One</a> and reasoning models at <a href="https://scale.com" target="_blank" rel="noopener noreferrer" className="inline-link">Scale AI</a>.</p>
            <p>Outside of all that, I'm watching <a href="https://myanimelist.net/anime/30/Shinseiki_Evangelion" target="_blank" rel="noopener noreferrer" className="inline-link">Neon Genesis Evangelion</a>, trying new restaurants (Beli profile needs work), and planning some fun trips!</p>
          </section>
        )}

        {activeTab === 'experience' && (
          <section className="experience">
            <div className="timeline">
              {experiences.map((exp, idx) => {
                const isExpanded = expandedExperiences.has(idx);
                return (
                  <div
                    key={idx}
                    className={`timeline-item ${isExpanded ? 'expanded' : 'collapsed'}`}
                  >
                    <div
                      className="timeline-header"
                      onClick={() => toggleExperience(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleExperience(idx);
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div className="timeline-content">
                        <h3>
                          {exp.link ? (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-link"
                              style={{
                                '--link-color': exp.linkColor
                              } as React.CSSProperties}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </h3>
                        <div className="timeline-meta">
                          <p className="role">{exp.role}</p>
                          <span className="timeline-meta-separator">•</span>
                          <span className="period">{exp.period}</span>
                        </div>
                      </div>
                      <span className={`timeline-chevron ${isExpanded ? 'expanded' : 'collapsed'}`}>
                        ▼
                      </span>
                    </div>
                    {isExpanded && (
                      <ul className="timeline-details">
                        {exp.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
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
      </main>

      <footer role="contentinfo">
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
