import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import RegistrationDashboard from './views/reg/dashboard';
import Registration from './views/reg/register';
import Correction from './views/reg/correction';
import RetireDataSet from './views/reg/retire';
import ManagedDataSetProfile from './views/reg/profile';
import ManageDataSetQuality from './views/reg/quality';
import Modification from './views/reg/modify';

const routes = [
  {
    path: 'reg',
    element: <DashboardLayout />,
    children:[
      {path:'registration', element: <Registration />},
      {path:'registrationdashboard', element: <RegistrationDashboard />},
      {path:'correction', element: <Correction />},
      {path:'modification', element:<Modification />},
      {path:'retire', element:<RetireDataSet />},
      {path:'datasetprofile', element:<ManagedDataSetProfile />},
      {path:'datasetquality', element:<ManageDataSetQuality />}
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
