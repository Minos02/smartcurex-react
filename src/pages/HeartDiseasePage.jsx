import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import "./DiseasePage.css";

const HeartDiseasePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    age: "35",
    nmv: "130",
    tcp: "0",
    eia: "0",
    thal: "2",
    op: "0.0",
    mhra: "150"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setError("");
    const requiredFields = ["name", "age", "nmv", "mhra"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await api.post("/predict/heart-disease", {
        name: formData.name,
        age: parseInt(formData.age),
        nmv: parseFloat(formData.nmv),
        tcp: parseInt(formData.tcp),
        eia: parseInt(formData.eia),
        thal: parseInt(formData.thal),
        op: parseFloat(formData.op || 0),
        mhra: parseFloat(formData.mhra)
      });

      if (response.data.success) {
        navigate("/results", {
          state: {
            result: response.data,
            diseaseType: "Heart Disease Risk Assessment",
            patient: {
              name: formData.name,
              age: formData.age,
            },
            inputData: formData
          },
        });
      } else {
        setError(response.data.error || "Prediction failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Error analyzing risk. Make sure backend is running.");
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
          <span className="disease-icon">❤️</span>
          <h1>Heart Disease Detection</h1>
          <p>AI-Powered Cardiovascular Risk Assessment</p>
        </div>
      </div>

      <div className="disease-content">
        <section className="info-section">
          <h2>Model Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Accuracy</h3>
              <p>94%</p>
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
              <p>Healthy / At Risk</p>
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
                  placeholder="e.g., 35"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Resting BP (nmv) *</label>
                <input
                  type="number"
                  name="nmv"
                  value={formData.nmv}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 130"
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Heart Rate (mhra) *</label>
                <input
                  type="number"
                  name="mhra"
                  value={formData.mhra}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 150"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Chest Pain Type (tcp)</label>
                <select
                  name="tcp"
                  value={formData.tcp}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="0">Typical Angina (0)</option>
                  <option value="1">Atypical Angina (1)</option>
                  <option value="2">Non-Anginal (2)</option>
                  <option value="3">Asymptomatic (3)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Exercise Angina (eia)</label>
                <select
                  name="eia"
                  value={formData.eia}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="0">No (0)</option>
                  <option value="1">Yes (1)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Thalassemia (thal)</label>
                <select
                  name="thal"
                  value={formData.thal}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="2">Normal (2)</option>
                  <option value="1">Fixed Defect (1)</option>
                  <option value="3">Reversible Defect (3)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Oldpeak (op)</label>
                <input
                  type="number"
                  name="op"
                  value={formData.op}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 0.0"
                  step="0.1"
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
          <h2>About Heart Disease Detection</h2>
          <div className="details-content">
            <p>
              Heart disease remains the leading cause of death globally. Early identification
              of cardiovascular risk factors enables timely intervention and lifestyle modifications.
            </p>
            <p>
              Our system evaluates multiple cardiac indicators to predict heart disease risk.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeartDiseasePage;
