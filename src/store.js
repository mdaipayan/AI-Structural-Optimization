import { create } from 'zustand';

export const useModelStore = create((set) => ({
  // Input Data (Mimicking your Streamlit session state)
  floors: [{ Floor: 1, 'Height (m)': 3.2 }, { Floor: 2, 'Height (m)': 3.0 }, { Floor: 3, 'Height (m)': 3.0 }],
  params: { col_dim: "230x400", beam_dim: "230x400", fck: 25.0, fy: 500.0, live_load: 2.0, floor_finish: 1.5, wall_thickness: 230, slab_thickness: 150, lateral_coeff: 0.025 },
  
  // Output Data from Python
  nodes: [],
  elements: [],
  isAnalyzing: false,

  // Actions
  setAnalysisResults: (nodes, elements) => set({ nodes, elements }),
  setAnalyzing: (status) => set({ isAnalyzing: status }),
}));
