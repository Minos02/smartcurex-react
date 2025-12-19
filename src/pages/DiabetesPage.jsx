import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./DiseasePage.css";

const DiabetesPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "30",
    pregnancies: "0",
    glucose: "100",
    bp: "70",
    skin_thickness: "0",
    insulin: "0",
    bmi: "25",
    diabetes_pedigree: "0.5"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setError("");
    const requiredFields = ["name", "age", "glucose", "bmi"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await api.post("/predict/diabetes", {
        name: formData.name,
        age: parseInt(formData.age),
        pregnancies: parseInt(formData.pregnancies),
        glucose: parseFloat(formData.glucose),
        bp: parseFloat(formData.bp),
        skin_thickness: parseFloat(formData.skin_thickness),
        insulin: parseFloat(formData.insulin),
        bmi: parseFloat(formData.bmi),
        diabetes_pedigree: parseFloat(formData.diabetes_pedigree)
      });

      if (response.data.success) {
        navigate("/results", {
          state: {
            result: response.data,
            diseaseType: "Diabetes Risk Assessment",
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
          <span className="disease-icon">🩺</span>
          <h1>Diabetes Detection</h1>
          <p>AI-Powered Diabetes Risk Assessment</p>
        </div>
      </div>

      <div className="disease-content">
        <section className="info-section">
          <h2>Model Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Accuracy</h3>
              <p>92%</p>
            </div>
            <div className="info-card">
              <h3>Model Type</h3>
              <p>XGBoost</p>
            </div>
            <div className="info-card">
              <h3>Parameters</h3>
              <p>8 Features</p>
            </div>
            <div className="info-card">
              <h3>Output</h3>
              <p>Diabetic / Non-Diabetic</p>
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
                  placeholder="e.g., 30"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Glucose Level *</label>
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 100"
                  required
                />
              </div>
              <div className="form-group">
                <label>BMI (Body Mass Index) *</label>
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 25"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Blood Pressure</label>
                <input
                  type="number"
                  name="bp"
                  value={formData.bp}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 70"
                />
              </div>
              <div className="form-group">
                <label>Pregnancies</label>
                <input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Skin Thickness</label>
                <input
                  type="number"
                  name="skin_thickness"
                  value={formData.skin_thickness}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0"
                />
              </div>
              <div className="form-group">
                <label>Insulin</label>
                <input
                  type="number"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Diabetes Pedigree Function</label>
                <input
                  type="number"
                  name="diabetes_pedigree"
                  value={formData.diabetes_pedigree}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.5"
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
          <h2>About Diabetes Detection</h2>
          <div className="details-content">
            <p>
              Diabetes affects millions worldwide. Early detection is crucial for managing
              blood sugar levels and preventing serious complications.
            </p>
            <p>
              Our AI model evaluates metabolic and physiological indicators to assess diabetes risk.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiabetesPage;
