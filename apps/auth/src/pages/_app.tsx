import type { AppProps } from 'next/app';

import '@repo/tokens/dist/finance/css/_variables.css';

import Alert from '@repo/ds/components/alert/Alert';
import AlertProvider from '@repo/ui/hooks/alert/AlertProvider';

import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider elem={Alert}>
      <Component {...pageProps} />
    </AlertProvider>
  );
}
