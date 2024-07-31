import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient'; // Adjust the path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('login', {
        userName: e.target.username.value,
        password: e.target.password.value
      });

      const data = response.data;
      if (data) {
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  let AdminLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('login', {
        userName: e.target.username.value,
        password: e.target.password.value
      });

      const data = response.data;
      if (data) {
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));
        navigate('/admin');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  let logoutUser = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    setUser(null);
  };

  const updateToken = async () => {
    try {
      const response = await apiClient.post('refresh_token', {
        refreshToken: authTokens.refresh_token
      });
    
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access_token));
        console.log(jwtDecode(data.access_token));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      logoutUser(); // Logs out the user on any error, enhancing security
    } finally {
      if (loading) {
        setLoading(false); // Always ensure the loading state is managed correctly
      }
    }
  }

  let contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    AdminLoginUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;