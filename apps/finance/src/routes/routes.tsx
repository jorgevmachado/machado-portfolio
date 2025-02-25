import React, { lazy, Suspense } from 'react';

import { RouteProps } from './interface';

const Dashboard = lazy(() => import('../pages/dashboard'));
const Profile = lazy(() => import('../pages/profile'));
const Config = lazy(() => import('../pages/config'));
const Contact = lazy(() => import('../pages/contact'));
const Supplier = lazy(() => import('../pages/supplier'));
const SupplierType = lazy(() => import('../pages/supplier-type'));
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
        key: 'about',
        path: '/about',
        type: 'private',
        title: 'About',
        element: (
            <Suspense fallback={<h1>LOADING</h1>}>
                <h1>About in construction</h1>
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
        key: 'contact',
        path: '/contact',
        type: 'private',
        title: 'Contact',
        element: (
            <Suspense fallback={<h1>LOADING</h1>}>
                <Contact />
            </Suspense>
        ),
    },
    {
        key: 'expense',
        icon: 'expense',
        path: '/expenses',
        type: 'private',
        title: 'Expense',
        element: (<></>),
        children: [
            {
                key: 'expense-parent',
                icon: 'expense',
                path: '',
                type: 'private',
                title: 'Expense',
                element: (
                    <Suspense fallback={<h1>LOADING</h1>}>
                        <h1>Expense Construction</h1>
                    </Suspense>
                ),
            },
            {
                key: 'expense-category',
                icon: 'category',
                path: '/categories',
                type: 'private',
                title: 'Category',
                element: (
                    <Suspense fallback={<h1>LOADING</h1>}>
                        <h1>Expense Category in Construction</h1>
                    </Suspense>
                ),
                children: [
                    {
                        key: 'expense-category-type',
                        icon: 'filter',
                        path: '/types',
                        type: 'private',
                        title: 'Type',
                        element: (
                            <Suspense fallback={<h1>LOADING</h1>}>
                                <h1>Expense Category Type in Construction</h1>
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
                        <h1>Expense Group in Construction</h1>
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
        element: (<></>),
        children: [
            {
                key: 'supplier',
                icon: 'user-tie',
                path: '',
                type: 'private',
                title: 'Supplier',
                element: (
                    <Suspense fallback={<h1>LOADING</h1>}>
                        <Supplier />
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
                        <SupplierType />
                    </Suspense>
                ),
            },
        ],
    }
];

export const allRoutes: Array<RouteProps> = [...publicRoutes, ...privateRoutes];

export const childPath = (parentPath: string, childPath: string) => {
    return `${parentPath.replace(/\/$/, '')}/${childPath.replace(/^\//, '')}`;
};
