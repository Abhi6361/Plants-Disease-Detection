import React from 'react';
import PlantDiseaseDetector from './components/PlantDiseaseDetector';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌱 Plant Disease Detection</h1>
        <p>Upload a plant image and describe symptoms to detect diseases</p>
      </header>
      <main>
        <PlantDiseaseDetector />
      </main>
    </div>
  );
}

export default App;