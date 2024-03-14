import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log('token', token);
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
