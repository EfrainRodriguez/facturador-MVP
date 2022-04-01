import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
import { RouteProgress } from '../components';
// layout
import DashboardLayout from '../layouts/dashboard';
// paths
import {
  PATH_AUTH,
  PATH_HOME,
  PATH_PROFILE,
  PATH_INVENTORY,
  PATH_PERSONS,
  PATH_SALES
} from './paths';
// loading page
import LoadingPage from '../pages/LoadingPage';

export const renderRoutesList = (routes = []) =>
  routes.map((route, index) => {
    const Component = route.component || Fragment;
    const Guard = route.guard || Fragment;
    const Layout = route.layout || Fragment;
    if (!route.routes) {
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <RouteProgress>
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            </RouteProgress>
          }
        />
      );
    }
    return (
      <Route
        key={index}
        element={
          <Guard>
            <Layout />
          </Guard>
        }
      >
        {renderRoutesList(route.routes)}
      </Route>
    );
  });

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingPage />}>
    <Routes>{renderRoutesList(routes)}</Routes>
  </Suspense>
);

export const routes = [
  {
    exact: true,
    path: PATH_AUTH.login,
    // guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  {
    exact: true,
    path: PATH_AUTH.forgotPassword,
    // guard: LoggedGuard,
    component: () => <div>Home</div>
  },
  {
    exact: true,
    path: PATH_AUTH.changePassword,
    // guard: LoggedGuard,
    component: () => <div>Home</div>
  },
  // private routes for logged and ok status user ------------------------
  {
    // guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      // home
      {
        exact: true,
        path: PATH_HOME.root,
        component: () => <div>home</div>
      },
      // sales
      {
        exact: true,
        path: PATH_SALES.root,
        component: () => <div>Sales</div>
      },
      // profile
      {
        exact: true,
        path: PATH_PROFILE.root,
        component: () => <div>profile</div>
      },
      // products
      {
        exact: true,
        path: PATH_INVENTORY.products,
        component: lazy(() => import('../pages/inventory/Products'))
      },
      {
        exact: true,
        path: PATH_INVENTORY.createProduct,
        component: lazy(() => import('../pages/inventory/CreateProduct'))
      },
      {
        exact: true,
        path: PATH_INVENTORY.editProduct,
        component: lazy(() => import('../pages/inventory/EditProduct'))
      },
      // categories
      {
        exact: true,
        path: PATH_INVENTORY.categories,
        component: () => <div>categories</div>
      },
      // stock
      {
        exact: true,
        path: PATH_INVENTORY.stock,
        component: () => <div>stock</div>
      },
      // customers
      {
        exact: true,
        path: PATH_PERSONS.customers,
        component: () => <div>users</div>
      },
      {
        exact: true,
        path: PATH_PERSONS.editCustomer.edit,
        component: () => <div>edit user</div>
      },
      {
        exact: true,
        path: PATH_PERSONS.createCustomer.create,
        component: () => <div>create user</div>
      },
      // providers
      {
        exact: true,
        path: PATH_PERSONS.providers,
        component: () => <div>providers</div>
      },
      // employees
      {
        exact: true,
        path: PATH_PERSONS.empolyees,
        component: () => <div>employees</div>
      }
    ]
  }
];
