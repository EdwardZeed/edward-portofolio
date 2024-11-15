import React from 'react';
import {
  GitHub,
  Instagram,
  LinkedIn,
  LocationOnOutlined,
} from '@mui/icons-material';
import './Introduction.css';
import profileImage from '../../assests/portofolio-img.png'; // Import your image file

function Introduction() {
  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="intro-container">
          <h1>Hi,</h1>
          <h2>I am Edward Zheng.</h2>
          <h3>I am a developer and engineer.</h3>

          <div className="location-container">
            <LocationOnOutlined className="location" />
            <p>Sydney, Australia</p>
          </div>

          <hr className="divider" />

          <p>
            I do software development, specialized in web application and mobile
            application. I love crafting ideas. Currently working at QuickSite
            Guru.
          </p>

          <div className="link-container">
            <a
              href="https://www.linkedin.com/in/wenxi-zheng-6364b322a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </a>

            <a
              href="https://github.com/EdwardZeed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>

            <a
              href="https://www.instagram.com/edwardhimeself/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <div className="image-container">
          <img src={profileImage} alt="Edward Zheng" />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
