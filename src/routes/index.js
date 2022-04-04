import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
import { RouteProgress } from '../components';
// layout
import DashboardLayout from '../layouts/dashboard';
// guards
import AuthGuard from '../guards/AuthGuard';
import LoggedGuard from '../guards/LoggedGuard';
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
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  {
    path: PATH_AUTH.forgotPassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ForgotPassword'))
  },
  {
    path: PATH_AUTH.changePassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ResetPassword'))
  },
  // private routes for logged and ok status user ------------------------
  {
    guard: AuthGuard,
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
        component: lazy(() => import('../pages/inventory/products/Products'))
      },
      {
        path: PATH_INVENTORY.createProduct,
        component: lazy(() =>
          import('../pages/inventory/products/CreateProduct')
        )
      },
      {
        path: PATH_INVENTORY.editProduct,
        component: lazy(() => import('../pages/inventory/products/EditProduct'))
      },
      // categories
      {
        path: PATH_INVENTORY.categories,
        component: lazy(() =>
          import('../pages/inventory/categories/Categories')
        )
      },
      {
        path: PATH_INVENTORY.editCategory,
        component: lazy(() =>
          import('../pages/inventory/categories/EditCategory')
        )
      },
      {
        path: PATH_INVENTORY.createCategory,
        component: lazy(() =>
          import('../pages/inventory/categories/CreateCategory')
        )
      },
      // stock
      {
        path: PATH_INVENTORY.stock,
        component: lazy(() => import('../pages/persons/customers/Customers'))
      },
      // customers
      {
        path: PATH_PERSONS.customers,
        component: lazy(() => import('../pages/persons/customers/Customers'))
      },
      {
        path: PATH_PERSONS.createCustomer,
        component: lazy(() =>
          import('../pages/persons/customers/CreateCustomer')
        )
      },
      {
        path: PATH_PERSONS.editCustomer,
        component: lazy(() => import('../pages/persons/customers/EditCustomer'))
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
