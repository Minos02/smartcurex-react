import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-subtitle fade-in">
          AI-POWERED HEALTHCARE
        </div>
        <h1 className="hero-title fade-in-delay">
          Healthcare Powered by
          <span className="gradient-text"> Artificial Intelligence</span>
        </h1>
        <p className="hero-description fade-in-delay-2">
          Advanced medical image classification for early disease detection.
          Empowering healthcare professionals with cutting-edge AI technology.
        </p>
        <div className="hero-buttons fade-in-delay-3">
          <button className="primary-btn" onClick={() => {
  document.getElementById('detection')?.scrollIntoView({ behavior: 'smooth' });
}}>
  Try Detection
</button>

          <button className="secondary-btn" onClick={() =>  {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Learn More →
          </button>
        </div>
      </div>
      
      <div className="hero-visual">
        {/* Row 1 */}
        <div className="floating-card card-1">
          <div className="card-icon">🧠</div>
          <p>Brain Tumor</p>
        </div>
        <div className="floating-card card-2">
          <div className="card-icon">🫁</div>
          <p>Pneumonia</p>
        </div>
        <div className="floating-card card-3">
          <div className="card-icon">🧬</div>
          <p>Alzheimer's</p>
        </div>
        
        {/* Row 2 - NEW! */}
        <div className="floating-card card-4">
          <div className="card-icon">❤️</div>
          <p>Heart Disease</p>
        </div>
        <div className="floating-card card-5">
          <div className="card-icon">🩺</div>
          <p>Diabetes</p>
        </div>
        
        {/* Row 3 - NEW! */}
        <div className="floating-card card-6">
          <div className="card-icon">🎗️</div>
          <p>Breast Cancer</p>
        </div>
        <div className="floating-card card-7">
          <div className="card-icon">😷</div>
          <p>COVID-19</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
