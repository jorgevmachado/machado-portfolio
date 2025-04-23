import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '@repo/tokens/dist/group/css/_variables.css';

import Alert from '@repo/ds/components/alert/Alert';
import AlertProvider from '@repo/ui/hooks/alert/AlertProvider';

import '../styles/global.scss';
import {acceptedSources} from "../shared";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { source } = router.query;
  const [faviconUrl, setFaviconUrl] = useState<string>('/favicon.ico');
  useEffect(() => {
    if (!source) {
      return;
    }
    if(!acceptedSources().includes(source as string)) {
      return;
    }
    setFaviconUrl(`/${source}/favicon/favicon.ico`);
  }, []);
  return (
    <AlertProvider elem={Alert}>
      <>
        <Head>
          <link rel="icon" href={faviconUrl} />
        </Head>
        <Component {...pageProps} />
      </>
    </AlertProvider>
  );
}
