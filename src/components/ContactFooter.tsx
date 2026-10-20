import React from 'react';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';

/** The "Get in touch" footer shared by every page, so "Contact" always lands on the same block. */
export default function ContactFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="contact-block">
        <p className="eyebrow">Get in touch</p>
        <h2>Let’s build something worth trusting.</h2>
        <a className="contact-email" href="mailto:zhengwenxi7@gmail.com">zhengwenxi7@gmail.com</a>
        <div className="social-links footer-links">
          <a href="https://github.com/EdwardZeed" target="_blank" rel="noreferrer"><GitHub />GitHub</a>
          <a href="https://www.linkedin.com/in/wenxi-zheng-6364b322a/" target="_blank" rel="noreferrer"><LinkedIn />LinkedIn</a>
          <a href="/Edward_CV.pdf" target="_blank" rel="noreferrer"><DescriptionOutlined />Resume</a>
        </div>
      </div>
      <p className="margin-note">Open minds<br />Better systems<br />Brighter outcomes</p>
    </footer>
  );
}
