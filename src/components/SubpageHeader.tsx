import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/** Header for every page except home, which has its own in-page anchors. */
export default function SubpageHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/">Edward Zheng</Link>
      <nav aria-label="Main navigation">
        <NavLink className="nav-home" to="/" end>Home</NavLink>
        <NavLink to="/projects" end>Projects</NavLink>
        <a href="#contact">Contact</a>
        <a href="/Edward_CV.pdf" target="_blank" rel="noreferrer">Resume</a>
      </nav>
    </header>
  );
}
