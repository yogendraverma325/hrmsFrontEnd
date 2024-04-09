import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PersonalDetails from '@/pages/Profile';

import Lodable from '../components/Lodable';
import AdminLayout from '../layout/MainLayout/Layout';
import ProtectedRoute from './ProtectedRoute';

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
      <Route element={<AdminLayout />}>
        <Route path="/addEmp" element={<AddEmp />} />
        <Route path="/dashbaord" element={<Dashboard />} />
        <Route path="/org" element={<OrgStructure />} />
        <Route path="profile/:userId" element={<PersonalDetails />} />
      </Route>

      <Route path="*" element={<Navigate to={'/login'} replace />} />
    </Routes>
  );
};

export default BaseRoutes;
