import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./DiseasePage.css";

const AlzheimersPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "65",
    image: null,
    imagePreview: null
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleAnalyze = async () => {
    setError("");

    if (!formData.name || !formData.age || !formData.image) {
      setError("Please fill in all fields and select an image");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("image", formData.image);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/predict/alzheimers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        navigate("/results", {
          state: {
            result: data,
            diseaseType: "Alzheimer's Risk Assessment",
            patient: { name: formData.name, age: formData.age },
            imagePreview: formData.imagePreview,
            imageFilename: formData.image?.name || 'scan.jpg' 
          }
        });
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError("Error analyzing image.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="disease-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="disease-hero">
        <div className="hero-content">
          <span className="disease-icon">🧠</span>
          <h1>Alzheimer's Detection</h1>
          <p>AI-Powered Brain MRI Analysis</p>
        </div>
      </div>

      <div className="disease-content">
        <section className="info-section">
          <h2>Model Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Accuracy</h3>
              <p>89%</p>
            </div>
            <div className="info-card">
              <h3>Model Type</h3>
              <p>EfficientNetB0</p>
            </div>
            <div className="info-card">
              <h3>Input</h3>
              <p>MRI Images</p>
            </div>
            <div className="info-card">
              <h3>Output</h3>
              <p>4 Classes</p>
            </div>
          </div>
        </section>

        <section className="upload-section">
          <h2>Upload MRI Image & Patient Data</h2>

          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 65"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>MRI Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* UPDATED IMAGE PREVIEW - CENTERED & BIGGER */}
            {formData.imagePreview && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '40px',
                marginBottom: '80px'  // Space for button below
              }}>
                <div style={{ 
                  position: 'relative', 
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <img 
                    src={formData.imagePreview} 
                    alt="MRI Preview" 
                    style={{
                      maxWidth: '700px',        // BIGGER SIZE
                      maxHeight: '700px',       // BIGGER SIZE
                      width: 'auto', 
                      height: 'auto',
                      minWidth: '400px',        // Minimum size
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      display: 'block',
                      objectFit: 'contain',     // Preserve aspect ratio
                      border: '3px solid #667eea'
                    }} 
                  />
                  
                  {/* Remove Button - Bottom Center */}
                  <button 
                    type="button" 
                    onClick={handleRemoveImage}
                    style={{ 
                      position: 'absolute',
                      bottom: '-50px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '160px',
                      height: '36px',
                      padding: '0',
                      background: 'linear-gradient(135deg, #ff3b30 0%, #ff1a1a 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(255,59,48,0.4)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%)';
                      e.target.style.transform = 'translateX(-50%) translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(255,59,48,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ff3b30 0%, #ff1a1a 100%)';
                      e.target.style.transform = 'translateX(-50%)';
                      e.target.style.boxShadow = '0 4px 12px rgba(255,59,48,0.4)';
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>🗑️</span>
                    Remove Image
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div style={{ 
                color: '#ff3b30', 
                marginBottom: '1rem', 
                textAlign: 'center',
                padding: '12px',
                background: '#ffe6e6',
                borderRadius: '8px',
                fontWeight: '600'
              }}>
                {error}
              </div>
            )}

            <button
              className="analyze-btn"
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              style={{
                marginTop: formData.imagePreview ? '60px' : '40px',  // Extra space if image shown
                width: '100%',
                maxWidth: '400px',
                margin: '60px auto 0 auto',
                display: 'block',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                background: isAnalyzing 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isAnalyzing) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
            >
              {isAnalyzing ? (
                <>
                  <span style={{ 
                    display: 'inline-block', 
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}>⏳</span>
                  Analyzing MRI...
                </>
              ) : (
                <>
                  <span style={{ marginRight: '8px' }}>🔬</span>
                  Analyze MRI Scan
                </>
              )}
            </button>
          </div>
        </section>

        <section className="details-section">
          <h2>About Alzheimer's Detection</h2>
          <div className="details-content">
            <p>
              Alzheimer's disease is the most common form of dementia. Early detection through
              advanced imaging analysis can help in early intervention.
            </p>
            <p>
              Our CNN model analyzes brain MRI scans to classify dementia severity levels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlzheimersPage;
