import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Functional from './components/Functional';
import Func001 from './components/001';
import Func002 from './components/002';
import Func003 from './components/003';
import './App.css';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/func" element={<Functional />} />
          <Route path="/001" element={<Func001 />} />
          <Route path="/002" element={<Func002 />} />
          <Route path="/003" element={<Func003 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;