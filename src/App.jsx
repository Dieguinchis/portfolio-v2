import { useState, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Background from './components/Background/Background'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Certificates from './components/Certificates/Certificates'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onFinish={handleFinish} />}
      {!loading && (
        <>
          <CustomCursor />
          <Background />
          <Navbar />
          <Hero />
          <About />
          <Certificates />
          <Services />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
