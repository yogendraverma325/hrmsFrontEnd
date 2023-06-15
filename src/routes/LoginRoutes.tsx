import { Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';

const LoginRoutes = {
  path: 'login',
  element: <Login />,
  // children: [
  //   {
  //     path: 'login',
  //     element: <Login />,
  //   },
  //   {
  //     path: 'auth-login',
  //     element: <Navigate to="/login" replace />,
  //   },
  // ],
};
export default LoginRoutes;
