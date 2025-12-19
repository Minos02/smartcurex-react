import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Chatbot',
      description: 'Get instant medical insights and guidance from our intelligent healthcare assistant.'
    },
    {
      icon: '📊',
      title: 'Multi-Disease Detection',
      description: 'Detect Alzheimer\'s, brain tumors, and pneumonia with high accuracy using deep learning.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Analysis',
      description: 'Upload medical images and receive instant AI-powered diagnostic predictions.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and processed with the highest security standards.'
    }
  ];

  return (
    <section id="features" className="features scroll-animate">

      <div className="section-header">
        <div className="section-label">OUR CAPABILITIES</div>
        <h2 className="section-title">Intelligent Features</h2>
        <p className="section-subtitle">Leveraging advanced machine learning models for healthcare</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
        

    </section>
    
  );
};

export default Features;
