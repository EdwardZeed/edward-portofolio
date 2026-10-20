import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NorthEast from '@mui/icons-material/NorthEast';
import SubpageHeader from '../components/SubpageHeader';
import ContactFooter from '../components/ContactFooter';
import useDocumentTitle from '../useDocumentTitle';

function NotFound() {
  useDocumentTitle('Page not found — Edward Zheng');

  // The SPA rewrite serves every unknown path with a 200, so tell crawlers not to index it.
  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <>
      <a className="skip-link" href="#not-found-title">Skip to content</a>
      <SubpageHeader />

      <main className="page subpage not-found">
        <section className="not-found-hero" aria-labelledby="not-found-title">
          <p className="eyebrow">404 · Page not found</p>
          <h1 id="not-found-title" tabIndex={-1}>This page doesn’t exist.</h1>
          <p className="projects-intro">
            The link may be out of date, or the address may have a typo. Here’s where you can go instead.
          </p>
          <ul className="not-found-links">
            <li>
              <Link className="text-link" to="/">Back to home <NorthEast /></Link>
            </li>
            <li>
              <Link className="text-link" to="/projects">See my projects <NorthEast /></Link>
            </li>
            <li>
              <a className="text-link" href="/Edward_CV.pdf" target="_blank" rel="noreferrer">Read my resume <NorthEast /></a>
            </li>
          </ul>
        </section>

        <ContactFooter />
      </main>
    </>
  );
}

export default NotFound;
