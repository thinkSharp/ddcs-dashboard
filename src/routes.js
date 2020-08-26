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
import ManagedDataSetQuality from './views/reg/quality';
import Modification from './views/reg/modify';
import AddDepository from './views/dep/add';
import ModifyDepository from './views/dep/modify';
import DeleteDepository from './views/dep/delete';
import DepositoryDashboard from './views/dep/dashboard';
import DepositoryDataProfile from './views/dep/profile';
import DepositoryDataQuality from './views/dep/quality';

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
      {path:'datasetquality', element:<ManagedDataSetQuality />}
    ]
  },
  {
    path: 'dep',
    element: <DashboardLayout />,
    children:[
      {path:'add', element: <AddDepository />},
      {path:'modify', element: <ModifyDepository />},
      {path:'delete', element:<DeleteDepository />},
      {path:'dashboard', element:<DepositoryDashboard />},
      {path:'profile', element: <DepositoryDataProfile />},
      {path:'quality', element:<DepositoryDataQuality />}

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
      { path: '/', element: <Navigate to="/reg/registration" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
