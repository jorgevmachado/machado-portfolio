import React from 'react';

import type { Metadata } from 'next';

import '@repo/tokens/dist/geek/css/_variables.css';
import '../styles/global.scss';
import Layout from '../layout';

export const metadata: Metadata = {
  title: {
    template: '%s | Geek',
    default: 'Welcome to Geek',
  },
  description: 'Welcome to Geek',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
