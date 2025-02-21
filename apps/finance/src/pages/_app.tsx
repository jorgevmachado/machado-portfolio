import type { AppProps } from 'next/app';

import '@repo/tokens/dist/finance/css/_variables.css';

import Alert from '@repo/ds/components/alert/Alert';
import AlertProvider from '@repo/ui/hooks/alert/AlertProvider';

import '../styles/global.scss';

import Layout from '../layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider elem={Alert} style={{ top: '5rem'}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertProvider>
  );
}
