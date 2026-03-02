import React from 'react';
import axios from 'axios';
import { useModelStore } from '../store';

const Sidebar = () => {
  const { floors, params, setAnalysisResults, setAnalyzing, isAnalyzing } = useModelStore();

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      // Send the structural data to your FastAPI backend
      const response = await axios.post('http://localhost:8000/api/solve', {
        floors: floors,
        params: params,
        // Add grids and columns here as you expand the UI
        x_grids: [], y_grids: [], columns: [] 
      });

      if (response.data.status === 'success') {
        // Update the global state with the calculated 3D elements
        setAnalysisResults(response.data.nodes, response.data.elements);
        alert("Optimization Complete!");
      }
    } catch (error) {
      console.error("Error connecting to Python engine:", error);
      alert("Failed to reach the AI Structural Engine.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ width: '300px', backgroundColor: '#f4f4f5', padding: '20px', height: '100vh', overflowY: 'auto' }}>
      <h2>🧠 AI Engine</h2>
      <p>Configure your model and run the physics-informed solver.</p>
      
      {/* You can add input fields here to update the store.params */}
      
      <button 
        onClick={runAnalysis} 
        disabled={isAnalyzing}
        style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        {isAnalyzing ? 'Propagating Gradients...' : 'Run Optimization'}
      </button>
    </div>
  );
};

export default Sidebar;
