import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import NorthEast from '@mui/icons-material/NorthEast';
import Close from '@mui/icons-material/Close';
import South from '@mui/icons-material/South';
import ConnectionGlobe from '../components/ConnectionGlobe';
import { projects } from '../data/projects';

const work = [
  {
    name: 'Bybit',
    role: 'Compliance quality assurance',
    summary: 'UI & API automation for compliance workflows.',
    tags: 'KYC · KYB · AML · Transaction monitoring',
    period: 'Nov 2025 — Aug 2026',
    details: [
      'Built and maintained UI and API automation for web and mobile compliance workflows, improving regression testing efficiency by 40%.',
      'Owned test planning, UAT and release-readiness checks for internal ERP and compliance modules, including database consistency and third-party integrations.',
      'Worked with stakeholders to clarify business needs and compliance gaps, translating business requirements (BRDs) into actionable product requirements (PRDs) and test plans to guide development and validation.',
      'Built AI-assisted workflows to diagnose UI test failures and trigger reruns, turning repeatable QA practices into reusable team skills.',
    ],
  },
  {
    name: 'Bluerate',
    role: 'Full-stack development',
    summary: 'A website and ERP system, from architecture to production.',
    tags: 'React · Supabase · Order management · Messaging',
    period: 'Jul 2024 — Feb 2026',
    details: [
      'Built the website and ERP end-to-end, owning the React frontend and Supabase backend.',
      'Created custom order and messaging modules, working directly with stakeholders to define and deliver features.',
      'Designed the database and deployment workflows, and collaborated with an external team on quality and scaling.',
    ],
  },
  {
    name: 'Mira',
    role: 'Frontend Developer Intern',
    summary: 'Turning design specifications into responsive, production-ready interfaces.',
    tags: 'TypeScript · Tailwind CSS · Git · Client collaboration',
    period: 'Jan 2025 — Jun 2025',
    details: [
      'Implemented responsive production interfaces using TypeScript and Tailwind CSS, translating design specifications into working UI.',
      'Organized project timelines and managed the team’s Git repository to support coordinated delivery.',
      'Worked directly with clients to clarify requirements and deliver the website to production.',
    ],
  },
  {
    name: 'Strong Compute',
    role: 'AI Engineer',
    summary: 'Exploring faster training across distributed compute nodes.',
    tags: 'Python · Ray · Mask R-CNN · COCO',
    period: 'Research project',
    details: [
      'Benchmarked Ray, Lightning, SkyPilot and Strong Compute’s distributed framework using Mask R-CNN and the COCO dataset.',
      'Integrated Ray into the distributed system, improving training speed by up to 36% across 12 GPUs on two Strong Compute nodes.',
      'Supported the team through literature review, troubleshooting and technical problem-solving.',
    ],
  },
];

const skillGroups = [
  {
    category: 'Frontend & Mobile',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'SwiftUI', 'Jetpack Compose'],
  },
  {
    category: 'Backend & Data',
    items: ['Java', 'Spring Boot', 'Python', 'Firebase', 'Supabase', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Cloud & Tooling',
    items: ['AWS', 'GCP', 'CloudFormation', 'Git', 'Ray'],
  },
];

function Home() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [active, setActive] = useState<number | null>(null);
  const [globeCompany, setGlobeCompany] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const globeIntro = useRef<HTMLElement>(null);

  const openDetails = (index: number) => {
    setActive(index);
    dialog.current?.showModal();
  };

  const revealCompany = useCallback((index: number) => {
    setExpanded(index);
    const target = document.getElementById(`work-trigger-${index}`);
    target?.scrollIntoView({
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
    window.setTimeout(() => target?.focus({ preventScroll: true }), 450);
  }, []);

  useEffect(() => {
    const section = globeIntro.current;
    if (!section || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / distance, 0), 1);
      section.style.setProperty('--scroll-progress', progress.toString());
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#profile">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top">Edward Zheng</a>
        <nav aria-label="Main navigation">
          <a href="#profile">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <Link to="/projects">Projects</Link>
          <a href="#contact">Contact</a>
          <a href="/Edward_CV.pdf" target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </header>

      <main>
        <section ref={globeIntro} className="globe-intro" id="top" aria-labelledby="opening-title">
          <div className="globe-stage">
            <p className="opening-kicker">Where I’ve contributed</p>
            <div className="network network--hero">
              <ConnectionGlobe onCompanyHover={setGlobeCompany} onCompanySelect={revealCompany} />
              {globeCompany !== null && (
                <div className="globe-company-card" aria-live="polite">
                  <strong>{work[globeCompany].name}</strong>
                  <span>{work[globeCompany].role}</span>
                  <small>Click the node to explore</small>
                </div>
              )}
            </div>
            <div className="opening-copy">
              <h1 id="opening-title">Edward Zheng</h1>
              <p>Software engineer · Systems thinker</p>
            </div>
            <a className="scroll-cue" href="#profile">Scroll to explore <South /></a>
          </div>
        </section>

        <div className="page" id="profile">
          <section className="profile-intro" aria-labelledby="intro-title">
            <div className="intro">
              <p className="eyebrow">About me</p>
              <h2 className="profile-title" id="intro-title">Hey, I’m Edward.</h2>
              <p className="intro-copy">
                I build software, test the details, and care about<br className="desktop-break" /> how systems earn trust.
              </p>
              <div className="social-links">
                <a href="https://github.com/EdwardZeed" target="_blank" rel="noreferrer"><GitHub />GitHub</a>
                <a href="https://www.linkedin.com/in/wenxi-zheng-6364b322a/" target="_blank" rel="noreferrer"><LinkedIn />LinkedIn</a>
                <a href="/Edward_CV.pdf" target="_blank" rel="noreferrer"><DescriptionOutlined />Resume</a>
              </div>
            </div>
            <p className="margin-note profile-note">
              Human intent<br />Clear logic<br />Thoughtful code<br />Earned trust
            </p>
          </section>

          <section className="work-section" id="work" aria-labelledby="work-title">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">A few things I’ve worked on.</h2>
            <div className="work-list">
              {work.map((item, index) => (
                <article className={`work-item ${expanded === index ? 'is-open' : ''}`} key={item.name}>
                  <h3>
                    <button
                      className="work-toggle"
                      id={`work-trigger-${index}`}
                      aria-expanded={expanded === index}
                      aria-controls={`work-panel-${index}`}
                      onClick={() => setExpanded(expanded === index ? null : index)}
                    >
                      <span className="work-name">{item.name}</span>
                      <span className="work-role">{item.role}</span>
                      {expanded === index ? <Remove /> : <Add />}
                    </button>
                  </h3>
                  <div
                    className="work-panel"
                    id={`work-panel-${index}`}
                    role="region"
                    aria-labelledby={`work-trigger-${index}`}
                    hidden={expanded !== index}
                  >
                    <p>{item.summary}</p>
                    <p className="work-tags">{item.tags}</p>
                    <button className="text-link" onClick={() => openDetails(index)}>
                      My contribution <NorthEast />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="skills-section" id="skills" aria-labelledby="skills-title">
            <p className="eyebrow">Toolbox</p>
            <h2 id="skills-title">Tools I reach for.</h2>
            <div className="skills-grid">
              {skillGroups.map(group => (
                <div className="skills-group" key={group.category}>
                  <h3>{group.category}</h3>
                  <ul className="skill-tags">
                    {group.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="projects-teaser" aria-labelledby="projects-teaser-title">
            <div className="projects-teaser-head">
              <div>
                <p className="eyebrow">A few builds</p>
                <h2 id="projects-teaser-title">Projects I’ve shipped.</h2>
              </div>
              <Link className="text-link" to="/projects">
                See all projects <NorthEast />
              </Link>
            </div>
            <div className="projects-preview-grid">
              {projects.map(project => (
                <Link className="project-preview-card" to="/projects" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </Link>
              ))}
            </div>
          </section>

          <footer id="contact">
            <div className="contact-block">
              <p className="eyebrow">Get in touch</p>
              <h2>Let’s build something worth trusting.</h2>
              <a className="contact-email" href="mailto:zhengwenxi7@gmail.com">zhengwenxi7@gmail.com</a>
              <div className="social-links footer-links">
                <a href="https://github.com/EdwardZeed" target="_blank" rel="noreferrer"><GitHub />GitHub</a>
                <a href="https://www.linkedin.com/in/wenxi-zheng-6364b322a/" target="_blank" rel="noreferrer"><LinkedIn />LinkedIn</a>
              </div>
            </div>
            <p className="margin-note">Open minds<br />Better systems<br />Brighter outcomes</p>
          </footer>
        </div>
      </main>

      <dialog
        ref={dialog}
        className="details-dialog"
        onClick={e => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="detail-title"
      >
        <button className="close-dialog" aria-label="Close contribution details" onClick={() => dialog.current?.close()}>
          <Close />
        </button>
        {active !== null && (
          <>
            <p className="eyebrow">{work[active].period}</p>
            <h2 id="detail-title">{work[active].name}</h2>
            <p className="detail-role">{work[active].role}</p>
            <ul>
              {work[active].details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a className="text-link" href="/Edward_CV.pdf" target="_blank" rel="noreferrer">
              Read my resume <NorthEast />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}

export default Home;
