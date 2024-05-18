import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages import
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
//components import

//public and private route import
function App() {
  return (
    <>
      {' '}
      <ToastContainer />
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/dashboard' element={ <Dashboard />} />
            <Route path='/login' element={ <Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
