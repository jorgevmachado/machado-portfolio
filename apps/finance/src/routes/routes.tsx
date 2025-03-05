import React, { lazy, Suspense } from 'react';

import { RouteProps } from './interface';

const Dashboard = lazy(() => import('../pages/dashboard'));
const Profile = lazy(() => import('../pages/profile'));
const Config = lazy(() => import('../pages/config'));
const Suppliers = lazy(() => import('../pages/suppliers'));
const SupplierTypes = lazy(() => import('../pages/suppliers/types'));
const ExpenseCategoryTypes = lazy(
  () => import('../pages/expenses/categories/types'),
);
const ExpenseCategories = lazy(() => import('../pages/expenses/categories'));
const ExpenseGroups = lazy(() => import('../pages/expenses/groups'));
const Expenses = lazy(() => import('../pages/expenses'));
export const publicRoutes: Array<RouteProps> = [
  {
    key: 'sign-in',
    path: '/sign-in',
    type: 'public',
    title: 'Sign In',
    element: (
      <>
        <h1>Sign In in construction</h1>
      </>
    ),
  },
  {
    key: 'sign-up',
    path: '/sign-up',
    type: 'public',
    title: 'Sign Up',

    element: (
      <>
        <h1>Sign Up in construction</h1>
      </>
    ),
  },
  {
    key: 'forgot-password',
    path: '/forgot-password',
    type: 'public',
    title: 'Forgot Password',
    element: (
      <>
        <h1>Forgot Password in construction</h1>
      </>
    ),
  },
  {
    key: 'reset-password',
    path: '/reset-password',
    type: 'public',
    title: 'Reset Password',
    element: (
      <>
        <h1>Reset Password in construction</h1>
      </>
    ),
  },
];

export const privateRoutes: Array<RouteProps> = [
  {
    key: 'dashboard',
    icon: 'home',
    path: '/dashboard',
    type: 'private',
    title: 'Dashboard',
    element: (
      <Suspense fallback={<h1>LOADING</h1>}>
        <Dashboard />,
      </Suspense>
    ),
  },
  {
    key: 'profile',
    icon: 'user',
    path: '/profile',
    type: 'private',
    title: 'Profile',
    element: (
      <Suspense fallback={<h1>LOADING</h1>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    key: 'config',
    icon: 'config',
    path: '/config',
    type: 'private',
    title: 'Configuration',
    element: (
      <Suspense fallback={<h1>LOADING</h1>}>
        <Config />
      </Suspense>
    ),
  },
  {
    key: 'expense',
    icon: 'expense',
    path: '/expenses',
    type: 'private',
    title: 'Expense',
    element: <></>,
    children: [
      {
        key: 'expense-parent',
        icon: 'expense',
        path: '',
        type: 'private',
        title: 'Expense',
        element: (
          <Suspense fallback={<h1>LOADING</h1>}>
            <Expenses />
          </Suspense>
        ),
      },
      {
        key: 'expense-category-parent',
        icon: 'category',
        path: '/categories',
        type: 'private',
        title: 'Category',
        element: <></>,
        children: [
          {
            key: 'expense-category',
            icon: 'category',
            path: '',
            type: 'private',
            title: 'Category',
            element: (
              <Suspense fallback={<h1>LOADING</h1>}>
                <ExpenseCategories />
              </Suspense>
            ),
          },
          {
            key: 'expense-category-type',
            icon: 'filter',
            path: '/types',
            type: 'private',
            title: 'Type',
            element: (
              <Suspense fallback={<h1>LOADING</h1>}>
                <ExpenseCategoryTypes />
              </Suspense>
            ),
          },
        ],
      },
      {
        key: 'expense-group',
        icon: 'group',
        path: '/group',
        type: 'private',
        title: 'Group',
        element: (
          <Suspense fallback={<h1>LOADING</h1>}>
            <ExpenseGroups />
          </Suspense>
        ),
      },
    ],
  },
  {
    key: 'supplier-parent',
    icon: 'user-tie',
    path: '/suppliers',
    type: 'private',
    title: 'Supplier',
    element: <></>,
    children: [
      {
        key: 'supplier',
        icon: 'user-tie',
        path: '',
        type: 'private',
        title: 'Supplier',
        element: (
          <Suspense fallback={<h1>LOADING</h1>}>
            <Suppliers />
          </Suspense>
        ),
      },
      {
        key: 'supplier-type',
        path: '/types',
        type: 'private',
        icon: 'box',
        title: 'Supplier Type',
        element: (
          <Suspense fallback={<h1>LOADING</h1>}>
            <SupplierTypes />
          </Suspense>
        ),
      },
    ],
  },
];

export const allRoutes: Array<RouteProps> = [...publicRoutes, ...privateRoutes];

interface FormatPathParams {
  childPath: string;
  parentPath: string;
  grandParentPath?: string;
}

export const formatPath = ({
  childPath,
  parentPath,
  grandParentPath,
}: FormatPathParams) => {
  const formatParentPath = validatePath(parentPath);
  const formatChildPath = validatePath(childPath);
  if (!grandParentPath) {
    return `${formatParentPath}${formatChildPath}`;
  }
  const formatGrandParentPath = validatePath(grandParentPath);
  return `${formatGrandParentPath}${formatParentPath}${formatChildPath}`;
};

const validatePath = (path: string) => {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;

};
