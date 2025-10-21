// This file is the layout export for virtual routes
// that works with v3_routeConfig.
// It does not affect the routes from the user app.

import {useNonce} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';
import {useTranslation} from 'react-i18next';
import {Layout as VirtualLayout} from './components/Layout.jsx';

import styles from './assets/styles.css?url';

export default function Layout() {
  const nonce = useNonce();
  const {t} = useTranslation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={styles}></link>
        <title>{t('hydrogen.virtualRoutes.virtualRoot.title')}</title>
        <meta
          name="description"
          content={t('hydrogen.virtualRoutes.virtualRoot.description')}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <VirtualLayout>
          <Outlet />
        </VirtualLayout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
