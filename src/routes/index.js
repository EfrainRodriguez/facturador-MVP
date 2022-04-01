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
  <Suspense fallback={null}>
    <Routes>{renderRoutesList(routes)}</Routes>
  </Suspense>
);

export const routes = [
  {
    path: PATH_AUTH.login,
    // guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  {
    path: PATH_AUTH.forgotPassword,
    // guard: LoggedGuard,
    component: () => <div>Home</div>
  },
  {
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
        path: PATH_HOME.root,
        component: () => <div>home</div>
      },
      // sales
      {
        path: PATH_SALES.root,
        component: () => <div>Sales</div>
      },
      // profile
      {
        path: PATH_PROFILE.root,
        component: () => <div>profile</div>
      },
      // products
      {
        path: PATH_INVENTORY.products,
        component: lazy(() => import('../pages/inventory/Products'))
      },
      {
        path: PATH_INVENTORY.createProduct,
        component: lazy(() => import('../pages/inventory/CreateProduct'))
      },
      {
        path: PATH_INVENTORY.editProduct,
        component: lazy(() => import('../pages/inventory/EditProduct'))
      },
      // categories
      {
        path: PATH_INVENTORY.categories,
        component: () => <div>categories</div>
      },
      // stock
      {
        path: PATH_INVENTORY.stock,
        component: () => <div>stock</div>
      },
      // customers
      {
        path: PATH_PERSONS.customers,
        component: () => <div>users</div>
      },
      {
        path: PATH_PERSONS.editCustomer.edit,
        component: () => <div>edit user</div>
      },
      {
        path: PATH_PERSONS.createCustomer.create,
        component: () => <div>create user</div>
      },
      // providers
      {
        path: PATH_PERSONS.providers,
        component: () => <div>providers</div>
      },
      // employees
      {
        path: PATH_PERSONS.empolyees,
        component: () => <div>employees</div>
      }
    ]
  }
];
