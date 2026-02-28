import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gatekeeper from './components/Gatekeeper';
import ExecutionDashboard from './components/ExecutionDashboard';
import AdminTriageDashboard from './components/AdminTriageDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            !isAuthenticated ? (
              <Gatekeeper onComplete={() => setIsAuthenticated(true)} />
            ) : (
              <ExecutionDashboard />
            )
          } />
          <Route path="/admin/triage" element={<AdminTriageDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
