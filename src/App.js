// src/App.js
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import TableOfContents from './components/TableOfContents/TableOfContents';
import SortingVisualizer from './components/Visualizers/SortingVisualizer';
import LinkedListVisualizer from './components/Visualizers/LinkedListVisualizer';
import QueueVisualizer from './components/Visualizers/QueueVisualizer';
import StackVisualizer from './components/Visualizers/StackVisualizer';
import Nqueen from './components/Visualizers/Nqueen';
import Convexhull from './components/Visualizers/Convexhull';
import TowerOfHanoiVisualizer from './components/Visualizers/TowerOfHanoiVisualizer';
import BstVisualizer from './components/Visualizers/BstVisualizer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/table-of-contents" element={<TableOfContents />} />
        <Route path="/linked-list" element={<LinkedListVisualizer />} />
        <Route path="/stack" element={<StackVisualizer />} />
        <Route path="/queue" element={<QueueVisualizer />} />
        <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
        <Route path="/bst" element={<BstVisualizer />} />
        <Route path="/Nqueen" element={<Nqueen />} />
        <Route path="/Convexhull" element={<Convexhull />} />
        <Route path="/TOH" element={<TowerOfHanoiVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
