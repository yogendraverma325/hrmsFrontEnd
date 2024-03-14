import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Lodable from '../components/Lodable';

import AdminLayout from '../layout/MainLayout/Layout';
import ProtectedRoute from './ProtectedRoute';

const Login = Lodable(lazy(() => import('../pages/auth/Login')));
const AddEmp = Lodable(lazy(() => import('../pages/Employees/AddEmp')));

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
      </Route>
      <Route path="*" element={<Navigate to={'/addEmp'} replace />} />
    </Routes>
  );
};

export default BaseRoutes;
