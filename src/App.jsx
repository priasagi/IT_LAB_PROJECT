
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import HeroSection from './HeroSection.jsx';
import Features from './Features.jsx';
import ContactSection from './ContactSection.jsx';

import Register from './Register.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

import './App.css';

function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <ContactSection />
      <footer className="footer">
        <p>© 2026 AI Workflow. Built with React.</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}
