// This file is the root of every virtual route tree.
// It does not affect the routes from the user app.

import type {LinksFunction} from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import {useTranslation} from 'react-i18next';
import favicon from './assets/favicon.svg';
import {Layout as VirtualLayout} from './components/Layout.jsx';
import {useNonce} from '@shopify/hydrogen';

import styles from './assets/styles.css?url';

export const links: LinksFunction = () => {
  return [{rel: 'icon', type: 'image/svg+xml', href: favicon}];
};

export default function App() {
  const {t} = useTranslation();
  const nonce = useNonce();
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

export function ErrorBoundary() {
  const {t} = useTranslation();
  const error = useRouteError();
  let errorMessage = t('hydrogen.virtualRoutes.virtualRoot.unknownError');
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <VirtualLayout>
      <div className="route-error">
        <h1>{t('hydrogen.virtualRoutes.virtualRoot.errorHeading')}</h1>
        <h2>{errorStatus}</h2>
        {errorMessage && (
          <fieldset>
            <pre>{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </VirtualLayout>
  );
}
