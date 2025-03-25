import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import UserProvider from './context/userContext';
import ProtectedRoute from './ProtectedRoute';  // Import the new component
import UserInfo from './pages/Auth/UserInfo';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';


const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]); // Add dependencies to ensure navigation is handled properly

  return null; // No UI is needed for this component, as it's just redirecting
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Root/>} />

          {/* Protected Routes (Only accessible if logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        toastOptions={{
          className: 'p-4',
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '13px',
          },
        }}
      />
    </UserProvider>
  );
}

export default App;
