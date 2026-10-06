import React from 'react';
import { Link } from 'react-router-dom';
import NorthEast from '@mui/icons-material/NorthEast';
import { joboard, projects } from '../data/projects';

function Projects() {
  return (
    <>
      <a className="skip-link" href="#project-list">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" to="/">Edward Zheng</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          <a href="mailto:zhengwenxi7@gmail.com">Contact</a>
          <a href="/Edward_CV.pdf" target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </header>

      <main className="page projects-page">
        <section className="projects-hero" aria-labelledby="projects-title">
          <Link className="back-link" to="/">← Back to home</Link>
          <p className="eyebrow">Projects</p>
          <h1 id="projects-title">Things I’ve built.</h1>
          <p className="projects-intro">
            My latest build is an agent that does my job search. Below it are earlier projects from coursework and personal builds across web, mobile, cloud and desktop.
          </p>
        </section>

        <article className="featured" id="project-list" aria-labelledby="joboard-title">
          <div className="featured-head">
            <h2 id="joboard-title">{joboard.title}</h2>
            <p className="featured-since">{joboard.since}</p>
          </div>
          <p className="featured-summary">{joboard.summary}</p>

          <ol className="pipeline" aria-label="What happens in one daily run">
            {joboard.steps.map((step, index) => (
              <li className="pipeline-step" key={step.name}>
                <span className="pipeline-node" aria-hidden="true">{index + 1}</span>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="featured-columns">
            <div>
              <h3>Built so it can’t apply twice</h3>
              <ul className="featured-safeguards">
                {joboard.safeguards.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>What it runs on</h3>
              <dl className="featured-stack">
                {joboard.stack.map(group => (
                  <div key={group.part}>
                    <dt>{group.part}</dt>
                    <dd>
                      <ul className="skill-tags">
                        {group.items.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
              <a className="text-link" href={joboard.repo} target="_blank" rel="noreferrer">
                View dashboard code <NorthEast />
              </a>
            </div>
          </div>
        </article>

        <h2 className="earlier-title" id="earlier-title">Earlier projects</h2>
        <section className="project-list" aria-labelledby="earlier-title">
          {projects.map(project => (
            <article className="project-card" key={project.title}>
              <div className="project-card-head">
                <h2>{project.title}</h2>
                <span className="project-type">{project.type}</span>
              </div>
              <p className="project-summary">{project.summary}</p>
              <p className="project-tags">{project.tags}</p>
              <ul>
                {project.details.map(detail => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {project.repo && (
                <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
                  View code <NorthEast />
                </a>
              )}
            </article>
          ))}
        </section>

        <footer>
          <div>
            <p>Curious how any of these work?</p>
            <a className="text-link" href="mailto:zhengwenxi7@gmail.com">Say hello <NorthEast /></a>
          </div>
          <p className="margin-note">Open minds<br />Better systems<br />Brighter outcomes</p>
        </footer>
      </main>
    </>
  );
}

export default Projects;
