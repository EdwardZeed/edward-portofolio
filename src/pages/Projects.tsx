import React from 'react';
import { Link } from 'react-router-dom';
import NorthEast from '@mui/icons-material/NorthEast';
import { projects } from '../data/projects';

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
            A handful of projects from coursework, personal builds and freelance work — spanning web, mobile, cloud and desktop.
          </p>
        </section>

        <section className="project-list" id="project-list">
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
