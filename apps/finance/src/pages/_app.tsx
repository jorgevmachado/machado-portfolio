import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

import '@repo/tokens/dist/finance/css/_variables.css';

import Alert from '@repo/ds/components/alert/Alert';
import AlertProvider from '@repo/ui/hooks/alert/AlertProvider';

import '../styles/global.scss';

import Layout from '../layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <AlertProvider elem={Alert}>
      <Component {...pageProps} />
    </AlertProvider>,
  );
}
