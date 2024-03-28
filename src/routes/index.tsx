import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Lodable from '../components/Lodable';

import AdminLayout from '../layout/MainLayout/Layout';
import ProtectedRoute from './ProtectedRoute';
import PersonalDetails from '@/pages/Profile';

const Login = Lodable(lazy(() => import('../pages/auth/Login')));
const AddEmp = Lodable(lazy(() => import('../pages/Employees/AddEmp')));
const OrgStructure = Lodable(lazy(() => import('../pages/Structure/orgStructure')));
const Dashboard = Lodable(lazy(() => import('../pages/Dashboard/Dashboard')));
// project import

// ==============================|| ROUTING RENDER ||============================== //
const BaseRoutes = () => {
  return (
    <Routes>
      {/* Consider it as Public Route */}
      <Route index path="/login" element={<Login />} />
      <Route index element={<Navigate to={'/login'} replace />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route>
        <Route
          path="/addEmp"
          element={
            <AdminLayout>
              <AddEmp />
            </AdminLayout>
          }
        />
        <Route
          path="/dashbaord"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/org"
          element={
            <AdminLayout>
              <OrgStructure />
            </AdminLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AdminLayout>
              <PersonalDetails />
            </AdminLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default BaseRoutes;
