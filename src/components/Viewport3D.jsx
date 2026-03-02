import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Grid } from '@react-three/drei';
import { useModelStore } from '../store';

const StructuralModel = () => {
  const elements = useModelStore((state) => state.elements);

  return (
    <group>
      {elements.map((el, index) => {
        // Your Python Node dataclass returns x, y, z
        const startPoint = [el.ni.x, el.ni.y, el.ni.z];
        const endPoint = [el.nj.x, el.nj.y, el.nj.z];
        
        // Differentiate colors based on utilization ratio or type
        const isFailing = el.ur_max > 1.0;
        const color = isFailing ? '#ef4444' : (el.type === 'Column' ? '#3b82f6' : '#10b981');

        return (
          <Line
            key={index}
            points={[startPoint, endPoint]}
            color={color}
            lineWidth={3}
          />
        );
      })}
    </group>
  );
};

const Viewport3D = () => {
  return (
    <div style={{ flex: 1, height: '100vh', backgroundColor: '#1e1e1e' }}>
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <StructuralModel />
        
        {/* Adds a nice reference grid at Z=0 */}
        <Grid infiniteGrid fadeDistance={50} sectionColor="#666" cellColor="#333" />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default Viewport3D;
