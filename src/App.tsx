import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AICustomerSupport from './pages/AICustomerSupport';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ai-customer-support" element={<AICustomerSupport />} />
      </Routes>
    </Router>
  );
}

export default App; 