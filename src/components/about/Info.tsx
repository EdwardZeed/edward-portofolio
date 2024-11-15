import React from 'react';

function Info() {
  return (
    <div className="about__info grid">
      <div className="about__box">
        <i className="uil uil-award about__icon"></i>

        <div className="about__title">Experience</div>
        <span className="about__subtitle">2 years working</span>
      </div>

      <div className="about__box">
        <i className="uil uil-briefcase-alt about__icon"></i>

        <div className="about__title">Completed</div>
        <span className="about__subtitle">10 + projects</span>
      </div>

      <div className="about__box">
        <i className="uil uil-arrow about__icon"></i>

        <div className="about__title">Now</div>
        <span className="about__subtitle">
          Frontend Developer at QuickSite Guru
        </span>
      </div>
    </div>
  );
}

export default Info;
