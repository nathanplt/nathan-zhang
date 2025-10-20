export default function Home() {
  const experiences = [
    {
      company: 'Capital One',
      role: 'Software Engineer Intern',
      period: 'Jun – Aug 2025',
      points: [
        'Rebuilt financial reporting pipeline with serverless architecture (AWS Step Functions, Fargate)',
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
      description: 'High-throughput pub/sub messaging system with thread-safe concurrent architecture using thread pools, async I/O, and atomic operations. Includes benchmarking harness for latency and throughput measurement.'
    },
    {
      title: 'Code Review Agent',
      tech: 'Python, FastAPI, Kafka, PostgreSQL, pgvector, Docker',
      description: 'PR review agent with GitHub Apps integration generating code-diff summaries and inline comments. Implements security detection and uses vector search with pgvector embeddings for pattern matching.'
    },
    {
      title: 'Bill-Splitting App',
      tech: 'React Native, Node.js, Express, PostgreSQL, AWS',
      description: 'Receipt parsing automation with AWS Textract OCR. Features QR tab sharing, payment integration (PayPal/Venmo), and loan tracking on a Node.js backend.'
    }
  ];

  const interests = [
    {
      title: 'High Performance Systems',
      description: 'Low-latency messaging, concurrent architectures, async I/O, thread-safe designs'
    },
    {
      title: 'AI Optimization & Training',
      description: 'Model fine-tuning, algorithmic reasoning, embeddings, LLM applications'
    },
    {
      title: 'Distributed Data Systems',
      description: 'Serverless architectures, ETL pipelines, data lakes, stream processing'
    }
  ];

  return (
    <div className="container">
      <header>
        <h1>Nathan Zhang</h1>
        <p className="subtitle">Computer Science @ UCLA</p>
        <div className="contact">
          <a href="mailto:nlzhang@ucla.edu">email</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/nathan-zhang-718422269/" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span>/</span>
          <a href="https://github.com/nathanplt" target="_blank" rel="noopener noreferrer">github</a>
        </div>
      </header>

      <section className="about">
        <p>Interested in building high-performance systems, optimizing AI models, and designing distributed data infrastructure. Currently studying CS at UCLA.</p>
      </section>

      <section className="interests">
        <h2>Interests</h2>
        <div className="interest-grid">
          {interests.map((interest, idx) => (
            <div key={idx} className="interest-item">
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="experience">
        <h2>Experience</h2>
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

      <section className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-item">
              <h3>{project.title}</h3>
              <p className="tech-stack">{project.tech}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Nathan Zhang</p>
      </footer>
    </div>
  );
}
