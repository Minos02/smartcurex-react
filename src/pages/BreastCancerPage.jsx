import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./DiseasePage.css";

const BreastCancerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "50",
    mean_radius: "10",
    mean_texture: "15",
    mean_perimeter: "70",
    mean_area: "300",
    mean_smoothness: "0.1",
    mean_compactness: "0.1",
    mean_concavity: "0.1",
    mean_concave_points: "0.05",
    mean_symmetry: "0.2",
    mean_fractal_dimension: "0.06"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setError("");
    const requiredFields = ["name", "age", "mean_radius"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await api.post("/predict/breast-cancer", {
        name: formData.name,
        age: parseInt(formData.age),
        mean_radius: parseFloat(formData.mean_radius),
        mean_texture: parseFloat(formData.mean_texture),
        mean_perimeter: parseFloat(formData.mean_perimeter),
        mean_area: parseFloat(formData.mean_area),
        mean_smoothness: parseFloat(formData.mean_smoothness),
        mean_compactness: parseFloat(formData.mean_compactness),
        mean_concavity: parseFloat(formData.mean_concavity),
        mean_concave_points: parseFloat(formData.mean_concave_points),
        mean_symmetry: parseFloat(formData.mean_symmetry),
        mean_fractal_dimension: parseFloat(formData.mean_fractal_dimension)
      });

      if (response.data.success) {
        navigate("/results", {
          state: {
            result: response.data,
            diseaseType: "Breast Cancer Risk Assessment",
            patient: { name: formData.name, age: formData.age },
            inputData: formData
          },
        });
      } else {
        setError(response.data.error || "Prediction failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error analyzing risk.");
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
          <span className="disease-icon">🎀</span>
          <h1>Breast Cancer Detection</h1>
          <p>AI-Powered Tumor Classification</p>
        </div>
      </div>

      <div className="disease-content">
        <section className="info-section">
          <h2>Model Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Accuracy</h3>
              <p>96%</p>
            </div>
            <div className="info-card">
              <h3>Model Type</h3>
              <p>XGBoost</p>
            </div>
            <div className="info-card">
              <h3>Parameters</h3>
              <p>30 Features</p>
            </div>
            <div className="info-card">
              <h3>Output</h3>
              <p>Benign / Malignant</p>
            </div>
          </div>
        </section>

        <section className="upload-section">
          <h2>Enter Patient Data</h2>

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
                  placeholder="e.g., 50"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mean Radius *</label>
                <input
                  type="number"
                  name="mean_radius"
                  value={formData.mean_radius}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 10"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mean Texture</label>
                <input
                  type="number"
                  name="mean_texture"
                  value={formData.mean_texture}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 15"
                  step="0.1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mean Perimeter</label>
                <input
                  type="number"
                  name="mean_perimeter"
                  value={formData.mean_perimeter}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 70"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Mean Area</label>
                <input
                  type="number"
                  name="mean_area"
                  value={formData.mean_area}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 300"
                  step="0.1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mean Smoothness</label>
                <input
                  type="number"
                  name="mean_smoothness"
                  value={formData.mean_smoothness}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.1"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Mean Compactness</label>
                <input
                  type="number"
                  name="mean_compactness"
                  value={formData.mean_compactness}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.1"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mean Concavity</label>
                <input
                  type="number"
                  name="mean_concavity"
                  value={formData.mean_concavity}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.1"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Mean Concave Points</label>
                <input
                  type="number"
                  name="mean_concave_points"
                  value={formData.mean_concave_points}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.05"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ color: '#ff3b30', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Risk"}
          </button>
        </section>

        <section className="details-section">
          <h2>About Breast Cancer Detection</h2>
          <div className="details-content">
            <p>
              Breast cancer is one of the most common cancers affecting women worldwide.
              Early detection significantly improves treatment outcomes.
            </p>
            <p>
              Our AI model analyzes tumor characteristics to classify lesions as benign or malignant.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BreastCancerPage;
