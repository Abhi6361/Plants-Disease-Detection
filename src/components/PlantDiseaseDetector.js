import React, { useState } from 'react';
import { Upload, Camera, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { detectPlantDisease } from '../services/plantDiseaseAPI';
import './PlantDiseaseDetector.css';

const PlantDiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // store only text answer
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !symptoms.trim()) {
      setError('Please upload an image and describe the symptoms');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await detectPlantDisease(image, symptoms);
      // ✅ extract the AI's answer only
      setResult(data.answer || "No analysis returned");
    } catch (err) {
      setError(err.message || 'An error occurred while detecting the disease');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setImagePreview(null);
    setSymptoms('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="plant-detector-container">
      <div className="detector-card">
        <h2>Plant Disease Detection</h2>

        <form onSubmit={handleSubmit} className="detection-form">
          {/* Image Upload Section */}
          <div className="upload-section">
            <label className="upload-label">
              <div className="upload-area">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Plant preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={48} />
                    <p>Click to upload plant image</p>
                    <span>Supports JPG, PNG, WebP</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>
            </label>
          </div>

          {/* Symptoms Input Section */}
          <div className="symptoms-section">
            <label htmlFor="symptoms" className="symptoms-label">
              <FileText size={20} />
              Describe the symptoms you observe:
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., Yellow spots on leaves, wilting, brown patches, unusual growth patterns..."
              className="symptoms-input"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !image || !symptoms.trim()}
            className="submit-button"
          >
            {loading ? (
              <>
                <Loader2 className="spinner" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload size={20} />
                Detect Disease
              </>
            )}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="result-section">
            <h3>Detection Results</h3>
            <div className="result-card">
              <div className="result-header">
                <CheckCircle className="success-icon" />
              </div>
              <div className="description">
                {/* ✅ only show the answer string */}
                <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
              </div>
            </div>

            <button onClick={resetForm} className="reset-button">
              Analyze Another Plant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDiseaseDetector;
