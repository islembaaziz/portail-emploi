import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages import
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// Public and Private route import
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            {/* Redirect any undefined routes to the dashboard */}
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
