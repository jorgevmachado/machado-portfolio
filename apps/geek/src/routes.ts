export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/logout',
  '/reset-password',
];

export const authenticatedRoutes = [
  '/',
  '/dashboard',
  '/about',
  '/profile',
  '/logout',
];

export const allRoutes = [...authRoutes, ...authenticatedRoutes];
