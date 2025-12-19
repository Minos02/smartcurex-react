import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef();
  
  // FIX: Get ALL data including imagePreview
  const { result, diseaseType, patient, imagePreview } = location.state || {};
  
  // Generate report ID
  const [reportId] = useState(() => 
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  // DEBUG: Log received data
  useEffect(() => {
    console.log("📊 ResultsPage received:", { result, diseaseType, patient, imagePreview });
  }, [result, diseaseType, patient, imagePreview]);

  // No results check
  if (!result || !result.success) {
    return (
      <div className="results-page">
        <div className="error-container">
          <h2>No Results Found</h2>
          <p>Please perform an analysis first.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    const printContent = printRef.current;
    
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Medical Report</title>');
    
    printWindow.document.write('<style>');
    printWindow.document.write(`
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: Arial, sans-serif; padding: 15mm; background: white; }
      .results-container { max-width: 100%; }
    
      /* Report Header - Compact */
      .report-header { 
        display: flex; 
        justify-content: space-between; 
        padding-bottom: 1rem; 
        border-bottom: 2px solid #e5e7eb; 
        margin-bottom: 1.5rem; 
      }
      .logo-section { display: flex; gap: 0.5rem; align-items: center; }
      .report-logo { font-size: 2rem; }
      .report-header h1 { font-size: 1.5rem; color: #0071e3; margin: 0; }
      .report-header p { font-size: 0.8rem; margin: 0.3rem 0 0 0; }
      .report-meta { text-align: right; color: #6b7280; font-size: 0.75rem; }
      .report-meta p { margin: 0.3rem 0; }

      /* Report Sections */
      .report-section { margin-bottom: 1.5rem; page-break-inside: avoid; }
      .report-section h2 { 
        font-size: 1.1rem; 
        color: #374151; 
        margin-bottom: 0.8rem; 
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 0.3rem;
      }

      /* Patient Info Grid */
      .patient-info-grid { 
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        gap: 1rem; 
        padding: 0.8rem;
        background: #f9fafb;
        border-radius: 6px;
      }
      .info-item { display: flex; flex-direction: column; }
      .info-label { font-size: 0.7rem; color: #6b7280; margin-bottom: 0.2rem; }
      .info-value { font-size: 0.9rem; font-weight: 600; color: #111827; }

      /* Scan Image Section - CRITICAL FOR PRINTING */
      .scan-container { 
        text-align: center; 
        padding: 1rem;
        background: #f9fafb;
        border-radius: 8px;
      }
      .report-scan-image { 
        max-width: 400px !important; 
        max-height: 400px !important; 
        width: auto !important;
        height: auto !important;
        display: block !important; 
        margin: 0 auto 0.5rem auto !important;
        border: 2px solid #d1d5db !important; 
        border-radius: 8px !important;
        object-fit: contain !important;
        page-break-inside: avoid !important;
      }
      .scan-caption { 
        margin-top: 0.5rem; 
        color: #6b7280; 
        font-size: 0.75rem; 
        font-style: italic; 
        font-weight: 500;
      }

      /* Diagnosis Results */
      .highlight-section { 
        background: #f0f9ff; 
        padding: 1rem; 
        border-radius: 8px;
        border-left: 4px solid #0071e3;
      }
      .diagnosis-result { 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 1rem; 
      }
      .prediction-box, .confidence-box { 
        padding: 0.8rem; 
        background: white; 
        border-radius: 6px;
        border: 2px solid #e5e7eb;
      }
      .prediction-label, .confidence-label { 
        display: block; 
        font-size: 0.7rem; 
        color: #6b7280; 
        margin-bottom: 0.3rem;
      }
      .prediction-value { 
        font-size: 1.2rem; 
        font-weight: 700; 
        margin: 0;
      }
      .confidence-bar-container { 
        width: 100%; 
        height: 12px; 
        background: #e5e7eb; 
        border-radius: 6px; 
        overflow: hidden;
        margin: 0.5rem 0;
      }
      .confidence-bar { 
        height: 100%; 
        transition: width 0.3s;
      }
      .confidence-value { 
        font-size: 1.2rem; 
        font-weight: 700;
      }

      /* Probabilities */
      .probabilities-grid { 
        display: grid; 
        gap: 0.8rem; 
      }
      .probability-item { 
        padding: 0.6rem; 
        background: #f9fafb; 
        border-radius: 6px;
      }
      .prob-header { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 0.4rem;
      }
      .prob-label { 
        font-size: 0.8rem; 
        font-weight: 600; 
        color: #374151;
      }
      .prob-value { 
        font-size: 0.8rem; 
        font-weight: 700; 
        color: #0071e3;
      }
      .prob-bar-container { 
        width: 100%; 
        height: 8px; 
        background: #e5e7eb; 
        border-radius: 4px; 
        overflow: hidden;
      }
      .prob-bar { 
        height: 100%; 
        background: linear-gradient(90deg, #0071e3, #0096ff);
      }

      /* Disclaimer */
      .disclaimer { 
        background: #fef3c7; 
        padding: 0.8rem; 
        border-radius: 6px;
        border-left: 4px solid #f59e0b;
      }
      .disclaimer h3 { 
        font-size: 0.9rem; 
        color: #92400e; 
        margin-bottom: 0.4rem;
      }
      .disclaimer p { 
        font-size: 0.7rem; 
        color: #78350f; 
        line-height: 1.4;
      }

      /* Footer */
      .report-footer { 
        text-align: center; 
        padding-top: 1rem; 
        border-top: 2px solid #e5e7eb;
        margin-top: 2rem;
      }
      .report-footer p { 
        font-size: 0.7rem; 
        color: #6b7280; 
        margin: 0.2rem 0;
      }

      /* Hide non-printable elements */
      .no-print { display: none !important; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  const getStatusColor = () => {
    if (result.confidence >= 90) return '#10b981';
    if (result.confidence >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const formatPredictionText = (prediction) => {
    if (prediction === "COVID19" || prediction === "Positive") {
      return "COVID-19 Positive";
    } else if (prediction === "Negative" || prediction === "Normal") {
      return "COVID-19 Negative";
    }
    return prediction;
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="results-page">
      <div className="results-header no-print">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Analysis
        </button>
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print Report
        </button>
      </div>

      <div className="results-container" ref={printRef}>
        {/* Report Header */}
        <div className="report-header">
          <div className="logo-section">
            <span className="report-logo">🧠</span>
            <div>
              <h1>SmartCureX</h1>
              <p>AI-Powered Medical Diagnosis Report</p>
            </div>
          </div>
          <div className="report-meta">
            <p><strong>Report ID:</strong> {reportId}</p>
            <p><strong>Generated:</strong> {getCurrentDate()}</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className="report-section">
          <h2>Patient Information</h2>
          <div className="patient-info-grid">
            <div className="info-item">
              <span className="info-label">Patient Name</span>
              <span className="info-value">{result.name || patient?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{result.age || patient?.age || 'N/A'} years</span>
            </div>
            <div className="info-item">
              <span className="info-label">Test Type</span>
              <span className="info-value">{diseaseType || 'Medical Analysis'}</span>
            </div>
          </div>
        </div>

        {/* Uploaded Scan - FIXED TO SHOW IMAGE */}
        {imagePreview && (
          <div className="report-section">
            <h2>Medical Scan</h2>
            <div className="scan-container">
              <img 
                src={imagePreview} 
                alt="Medical Scan" 
                className="report-scan-image"
                title={result.image_filename || 'Uploaded scan'}
              />
              <p className="scan-caption">
                {result.image_filename || 'Uploaded MRI/CT scan'}
              </p>
            </div>
          </div>
        )}

        {/* Diagnosis Results */}
        <div className="report-section highlight-section">
          <h2>Diagnosis Results</h2>
          <div className="diagnosis-result">
            <div className="prediction-box" style={{ borderColor: getStatusColor() }}>
              <span className="prediction-label">Prediction</span>
              <h3 className="prediction-value" style={{ color: getStatusColor() }}>
                {formatPredictionText(result.prediction)}
              </h3>
            </div>
            <div className="confidence-box">
              <span className="confidence-label">Confidence Level</span>
              <div className="confidence-bar-container">
                <div 
                  className="confidence-bar" 
                  style={{ width: `${result.confidence}%`, backgroundColor: getStatusColor() }}
                />
              </div>
              <span className="confidence-value" style={{ color: getStatusColor() }}>
                {result.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Probabilities */}
        {result.all_probabilities && Object.keys(result.all_probabilities).length > 0 && (
          <div className="report-section">
            <h2>Detailed Analysis</h2>
            <div className="probabilities-grid">
              {Object.entries(result.all_probabilities).map(([key, value]) => (
                <div key={key} className="probability-item">
                  <div className="prob-header">
                    <span className="prob-label">{key}</span>
                    <span className="prob-value">{value}%</span>
                  </div>
                  <div className="prob-bar-container">
                    <div className="prob-bar" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer & Footer */}
        <div className="report-section disclaimer">
          <h3>⚠️ Medical Disclaimer</h3>
          <p>This AI-generated report is intended to assist healthcare professionals and should not be used as the sole basis for medical diagnosis or treatment decisions. Always consult with qualified medical professionals for proper diagnosis and treatment planning.</p>
        </div>

        <div className="report-footer">
          <p>SmartCureX AI Medical Diagnosis System | Powered by Deep Learning</p>
          <p>This is an automated report generated on {getCurrentDate()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
