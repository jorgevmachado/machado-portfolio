import React from 'react';

import { RouteProps } from './interface';

export const publicRoutes: Array<RouteProps> = [
  {
    key: 'sign-in',
    path: '/sign-in',
    type: 'public',
    title: 'Sign In',
  },
  {
    key: 'sign-up',
    path: '/sign-up',
    type: 'public',
    title: 'Sign Up',
  },
  {
    key: 'forgot-password',
    path: '/forgot-password',
    type: 'public',
    title: 'Forgot Password',
  },
  {
    key: 'reset-password',
    path: '/reset-password',
    type: 'public',
    title: 'Reset Password',
  },
];

export const privateRoutes: Array<RouteProps> = [
  {
    key: 'dashboard',
    icon: 'home',
    path: '/dashboard',
    type: 'private',
    title: 'Dashboard',
  },
  {
    key: 'profile',
    icon: 'user',
    path: '/profile',
    type: 'private',
    title: 'Profile',
  },
  {
    key: 'config',
    icon: 'config',
    path: '/config',
    type: 'private',
    title: 'Configuration',
  },
  {
    key: 'bank',
    icon: 'school',
    path: '/bank',
    type: 'private',
    title: 'Bank',
  },
  {
    key: 'expense',
    icon: 'expense',
    path: '/expenses',
    type: 'private',
    title: 'Expense',
  },
  {
    key: 'supplier-parent',
    icon: 'user-tie',
    path: '/suppliers',
    type: 'private',
    title: 'Supplier',
    children: [
      {
        key: 'supplier',
        icon: 'user-tie',
        path: '',
        type: 'private',
        title: 'Supplier',
      },
      {
        key: 'supplier-type',
        path: '/types',
        type: 'private',
        icon: 'box',
        title: 'Supplier Type',
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
