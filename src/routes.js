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
import AddSubscription from './views/dep/add';
import EditSubscription from './views/dep/edit';
import DeleteSubscription from './views/dep/delete';
import SearchSubscription from './views/dep/search';
import DepositoryDataProfile from './views/dep/profile';
import DepositoryDataQuality from './views/dep/quality';
import AddAcquisition from './views/acq/add';
import DeleteAcquisition from './views/acq/delete';
import SearchAcquisition from './views/acq/search';
import DataProfileAcquisition from './views/acq/profile';
import DataQualityAcquisition from './views/acq/quality';
import AddCatalog from './views/cat/add';
import EditCatalog from './views/cat/edit';
import DeleteCatalog from './views/cat/delete';
import SearchCatalog from './views/cat/search';
import AcquireCatalog from './views/acq/edit';


const routes = [
  {
    path: 'cat',
    element: <DashboardLayout />,
    children:[
      {path:'add', element: <AddCatalog />},
      {path:'edit/:catalogId', element: <EditCatalog />},
      {path:'retire/:catalogId', element:<DeleteCatalog />},
      {path:'search', element:<SearchCatalog />},
    ]
  },
  {
    path: 'dep',
    element: <DashboardLayout />,
    children:[
      {path:'add', element: <AddSubscription />},
      {path:'edit', element: <EditSubscription />},
      {path:'delete', element:<DeleteSubscription />},
      {path:'search', element:<SearchSubscription />},
      {path:'profile', element: <DepositoryDataProfile />},
      {path:'quality', element:<DepositoryDataQuality />}

    ]
  },
  {
    path: 'acq',
    element: <DashboardLayout />,
    children:[
      {path:'add', element: <AddAcquisition />},
      {path:'edit/:catalogId', element: <AcquireCatalog />},
      {path:'retire/:catalogId', element:<DeleteAcquisition />},
      {path:'search', element:<SearchAcquisition />},
      {path:'profile', element: <DataProfileAcquisition />},
      {path:'quality', element:<DataQualityAcquisition />}

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
      { path: 'login2/:id', element: <LoginView  /> },
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/cat/search" /> },
      { path: '*', element: <Navigate to="/404" /> }

    ]
  }
];

export default routes;
