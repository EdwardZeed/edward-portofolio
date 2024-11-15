import React from 'react';
import Card from './Card';
import './projects.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const Project_data = [
  {
    id: 1,
    title: 'Suncycle',
    description: [
      'Suncycle is a website to recycle the solar panel board within Australia, creating the consistency in sourcing materials and supporting the secondary market.',
      'Backend was implemented with Java Springboot, supported REST API. Authentication used JWT to improve security and implement stateless authentication.',
      'Implemented adding, reading and deleting operation to the MySQL cloud-hosted (GCP) database.',
      'Google Map API was integrated to get the latitude and longitude of a specific installation, Jackon library used for JSON object transaction.',
    ],
  },
  {
    id: 2,
    title: 'On Task Achiever',
    description: [
      'On Task Achiever is a mobile app which can be running on iOS and Android platform with Kotlin Multiplatform Framework.',
      'Backend was developed with Firebase, architected by MVVM architecture, it supports multiple login method, including email, Apple, Google and Facebook.',
      'The iOS UI was built with SwiftUI, and the Andoriod UI was built with Jetpack Compose.',
      'All the data stored in Firestore would be updated to the UI in real-time. The data would also be loaded into the UI while UI is still loading.',
    ],
  },
  {
    id: 3,
    title: 'Cafe App',
    description: [
      'This project is a cafe web application deployed with AWS EC2, Auto Scaling Group, and Load Balancer to achieve high availability.',
      'The cloud architecture is well designed to ensure the security feature. EC2 instances would be only connectable to a basion host instance, to avoid any other connection.',
      'The auto scaling group and load balancer were used to handle large volum request. Multiple avaibility zones are enabled to prevent sudden accident.',
      'RDS was created by the cloudformation with yaml file, which made the architecture easy to reimplement.',
    ],
  },
  {
    id: 3,
    title: 'Exchange Rate Desktop Application',
    description: [
      'This project developed a desktop application for checking exchange rate with Java and JavaFX.',
      'Implemented the whole UI design with JavaFX and MVP architecture to isolate the model and view layer. The rate is displayed with real-time data through API call.',
      'Used a stage management system to solve the problem, that to avoid the map view and main app view generate diﬀerent instances while reloading multiple times.',
      'Improved the user experience by adding multi-thread to avoid frozen screen. I used JavaFX concurrency class Task to handle the background API operation, so that the main UI thread will not be blocked while handling the API call.',
    ],
  },
];

function Projects() {
  return (
    <section className="projects container section" id="projects">
      <h2 className="section__title">My projects</h2>
      <span className="section__subtitle">Learning from hands-on projects</span>

      <Swiper
        className="project__container"
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        // effect="coverflow"
        loop={true}
        spaceBetween={40}
        centeredSlides={true}
        slidesPerView={'auto'}
        navigation
        pagination={{ clickable: true }}
        // coverflowEffect={{
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // }}
        breakpoints={{
          992: {
            spaceBetween: 20,
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
          576: {
            slidesPerView: 2,
          },
          350: {
            slidesPerView: 1,
          },
        }}
        // scrollbar={{ draggable: true }}
        // onSwiper={swiper => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {Project_data.map(({ id, title, description }) => {
          return (
            <SwiperSlide>
              <Card title={title} description={description}></Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Projects;
