import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { ScrollUp } from './components/scrollup/ScrollUp';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Introduction></Introduction>
    //   </header>
    // </div>
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollUp />

      <Analytics />
    </>
  );
}

export default App;
