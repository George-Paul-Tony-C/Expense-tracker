import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import UserProvider from './context/userContext';
import ProtectedRoute from './ProtectedRoute';  
import UserInfo from './pages/Auth/UserInfo';
import Settings from './pages/Dashboard/Settings';
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
  }, [isAuthenticated, navigate]); 

  return null; 
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Root/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/settings" element={<Settings />} />
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
