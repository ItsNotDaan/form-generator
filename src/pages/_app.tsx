import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from '@/presentation/style/theme';
import {Asap} from 'next/font/google';
import {Provider} from 'react-redux';
import React from 'react';
import {css, Global} from '@emotion/react';
import {wrapper} from '@/domain/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

// Use Next Font for automatic font optimization
// https://nextjs.org/docs/basic-features/font-optimization
const asap = Asap({subsets: ['latin'], display: 'swap'});

function App({Component, ...rest}: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <main className={asap.className} suppressHydrationWarning>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <ChakraProvider resetCSS theme={theme}>
            {/* Inject font as variable into css so it can also be used in portals */}
            {/* https://github.com/chakra-ui/chakra-ui/issues/7157#issuecomment-1531379718 */}
            <Global
              styles={css`
                :root {
                  --font-asap: ${asap.style.fontFamily};
                }
              `}
            />
            {/* Don't pre-render on server because the component depends on redux state that's only available in client */}
            {/* https://nextjs.org/docs/messages/react-hydration-error */}
            <Component {...props.pageProps} />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
