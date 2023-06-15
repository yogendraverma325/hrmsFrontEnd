import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Lodable from '../components/Lodable';
import MainLayout from '../layout/MainLayout/Index';
import ProtectedRoute from './ProtectedRoute';

const Login = Lodable(lazy(() => import('../pages/auth/Login')));
const AppriciationActivity = Lodable(lazy(() => import('../pages/AppriciationActivity')));
const UserProfile = Lodable(lazy(() => import('../pages/Profile')));
const ActivityFeed = Lodable(lazy(() => import('../pages/AppriciationFeed')));

// project import

// ==============================|| ROUTING RENDER ||============================== //
const BaseRoutes = () => {
  return (
    <Routes>
      {/* Consider it as Public Route */}
      <Route index path="/login" element={<Login />} />
      <Route index element={<Navigate to={'/login'} replace />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/overview"
          element={
            <MainLayout>
              <AppriciationActivity />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />

        <Route
          path="/appriciate-to"
          element={
            <MainLayout>
              <ActivityFeed />
            </MainLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={'/overview'} replace />} />
    </Routes>
  );
};

export default BaseRoutes;
