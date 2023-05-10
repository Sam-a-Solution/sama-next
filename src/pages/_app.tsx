import React from 'react';

import useRefreshInterval from '@hooks/auth/useRefreshInterval';
import { useUpdateLoginStatus } from '@hooks/auth/useUpdateLoginStatus';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import withAppProvider from 'contexts/app/app.provider';
import ModalsProvider from 'contexts/modal/modal.provider';
import { withGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

declare global {
  interface Window {
    fbq: any;
    gtag: any;
    kakaoPixel: any;
  }
}

function MyApp({ Component, pageProps }: any) {
  useUpdateLoginStatus();
  useRefreshInterval();

  return (
    <React.Fragment>
      <ModalsProvider>
        <Component {...pageProps} />
      </ModalsProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </React.Fragment>
  );
}

export default withAppProvider(withGlobalModalHandlerContext(MyApp));
