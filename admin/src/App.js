import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages import
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
//components import

//public and private route import
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

function App() {
  return (
    <>
      {' '}
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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
