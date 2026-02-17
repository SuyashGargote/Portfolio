import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import ExtraCurricular from './components/ExtraCurricular';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <main className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-green selection:text-black font-sans">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExtraCurricular />
      <Achievements />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}

export default App;