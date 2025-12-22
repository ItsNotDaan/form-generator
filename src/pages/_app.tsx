import type { AppProps } from 'next/app';
import '../index.css';
// import {ChakraProvider} from '@chakra-ui/react';
// import {theme} from '@/presentation/style/theme';
import { Asap } from 'next/font/google';
import { Provider } from 'react-redux';
import React from 'react';
// import {css, Global} from '@emotion/react';
import { wrapper } from '@/domain/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import appWithI18n from 'next-translate/appWithI18n';
import i18nConfig from '../../i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { useEffect } from 'react';
import { cleanupExpiredStorage } from '@/utils/localStorageHelper';

// Use Next Font for automatic font optimization
// https://nextjs.org/docs/basic-features/font-optimization
const asap = Asap({ subsets: ['latin'], display: 'swap' });

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    cleanupExpiredStorage();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="form-generator-theme">
      <main className={asap.className} suppressHydrationWarning>
        <style jsx global>{`
          :root {
            --font-asap: ${asap.style.fontFamily};
          }
        `}</style>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            {/* Don't pre-render on server because the component depends on redux state that's only available in client */}
            {/* https://nextjs.org/docs/messages/react-hydration-error */}
            <Component {...props.pageProps} />
          </PersistGate>
        </Provider>
      </main>
    </ThemeProvider>
  );
}

export default appWithI18n(App as any, i18nConfig);
