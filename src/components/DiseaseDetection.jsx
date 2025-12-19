import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

    const diseases = [
    {
      name: "Alzheimer's Disease",
      icon: '🧠',
      description: 'MRI-based classification using advanced CNN models',
      accuracy: '94%',
      model: 'EfficientNetB0',
      color: '#0071e3',
      path: '/alzheimers'
    },
    {
      name: 'Brain Tumor',
      icon: '🔬',
      description: 'Deep learning detection from MRI scans',
      accuracy: '92%',
      model: 'VGG16',
      color: '#bf4800',
      path: '/brain-tumor'
    },
    {
      name: 'Pneumonia',
      icon: '🫁',
      description: 'Chest X-ray analysis for respiratory diseases',
      accuracy: '96%',
      model: 'Custom CNN',
      color: '#06c',
      path: '/pneumonia'
    },
    {
      name: "COVID-19",
      icon: "🦠",
      description: "AI-powered COVID-19 detection from chest X-ray images",
      accuracy: "95%",
      model: "Binary CNN",
      color: "#10b981",
      path: "/detect/covid"
    },
    {
      name: "Diabetes",
      icon: "💉",
      description: "ML-based diabetes prediction using clinical parameters",
      accuracy: "96%",
      model: "Random Forest",
      color: "#f59e0b",
      path: "/diabetes"
    },
    {
      name: "Heart Disease",
      icon: "❤️",
      description: "Cardiovascular risk assessment from clinical data",
      accuracy: "94%",
      model: "Ensemble ML",
      color: "#ef4444",
      path: "/heart-disease"
    },
    {
      name: "Breast Cancer",
      icon: "🎗️",
      description: "Mammography analysis for early cancer detection",
      accuracy: "97%",
      model: "ResNet CNN",
      color: "#ec4899",
      path: "/breast-cancer"
    },
  ];
    


  return (
    <section id="detection" className="detection scroll-animate">

      <div className="section-header">
        <div className="section-label">AI MODELS</div>
        <h2 className="section-title">Disease Detection Models</h2>
        <p className="section-subtitle">Trained on extensive medical imaging datasets</p>
      </div>
      
      <div className="detection-tabs">
        {diseases.map((disease, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <span className="tab-icon">{disease.icon}</span>
            {disease.name}
          </button>
        ))}
      </div>

      <div className="detection-content">
        <div className="detection-card glass-effect">
          <div className="detection-header">
            <span className="detection-icon">{diseases[activeTab].icon}</span>
            <h3>{diseases[activeTab].name}</h3>
          </div>
          <p className="detection-description">{diseases[activeTab].description}</p>
          <div className="detection-stats">
            <div className="stat">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value" style={{ color: diseases[activeTab].color }}>
                {diseases[activeTab].accuracy}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Model</span>
              <span className="stat-value">{diseases[activeTab].model}</span>
            </div>
          </div>
          <button 
            className="upload-btn" 
            style={{ background: diseases[activeTab].color }}
            onClick={() => navigate(diseases[activeTab].path)}
          >
            Go to Detection Page →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;