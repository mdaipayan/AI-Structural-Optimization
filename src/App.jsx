import React from 'react';
import Sidebar from './components/Sidebar';
import Viewport3D from './components/Viewport3D';

function App() {
  return (
    <div style={{ display: 'flex', width: '100vw', margin: 0, padding: 0 }}>
      <Sidebar />
      <Viewport3D />
    </div>
  );
}

export default App;
