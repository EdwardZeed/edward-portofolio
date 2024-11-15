import React from 'react';
import './projects.css';

interface CardProps {
  title: string;
  description: string[];
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="card__container">
      <h3 className="project__title">{title}</h3>
      {/* Wrap the list items inside a <ul> */}
      <ul className="description">
        {description.map((item, index) => (
          <li className="project__description" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
