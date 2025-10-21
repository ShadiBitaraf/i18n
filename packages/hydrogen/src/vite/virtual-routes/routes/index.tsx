import {useLoaderData} from 'react-router';
import type {LinksFunction} from 'react-router';
import {Trans, useTranslation} from 'react-i18next';
import type {Shop} from '@shopify/hydrogen-react/storefront-api-types';
import {HydrogenLogoBaseBW} from '../components/HydrogenLogoBaseBW.jsx';
import {HydrogenLogoBaseColor} from '../components/HydrogenLogoBaseColor.jsx';
import {IconGithub} from '../components/IconGithub.jsx';
import {IconTwitter} from '../components/IconTwitter.jsx';
import {IconBanner} from '../components/IconBanner.jsx';
import {IconError} from '../components/IconError.jsx';
import favicon from '../assets/favicon.svg';
import interVariableFontWoff2 from '../assets/inter-variable-font.woff2';
import jetbrainsmonoVariableFontWoff2 from '../assets/jetbrainsmono-variable-font.woff2';
import type {I18nBase, StorefrontClient} from '@shopify/hydrogen';

interface AppLoadContext {
  storefront: StorefrontClient<I18nBase>['storefront'];
}

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: favicon,
  },
  {
    rel: 'preload',
    href: interVariableFontWoff2,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: jetbrainsmonoVariableFontWoff2,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
];

export async function loader({
  context: {storefront},
}: {
  context: AppLoadContext;
}) {
  const layout = await storefront.query<{shop: Shop}>(LAYOUT_QUERY);
  return {layout, isMockShop: storefront.getApiUrl().includes('mock.shop')};
}

export const HYDROGEN_SHOP_ID = 'gid://shopify/Shop/55145660472';

export function ErrorBoundary() {
  return <ErrorPage />;
}

export default function Index() {
  const {
    isMockShop,
    layout: {shop},
  } = useLoaderData<typeof loader>();
  const {t} = useTranslation();

  let {name: shopName, id: shopId} = shop;

  const configDone = shopId !== HYDROGEN_SHOP_ID && !isMockShop;
  if (isMockShop || !shopName)
    shopName = t('hydrogen.virtualRoutes.index.defaultShopName');

  return (
    <>
      <Layout shopName={shopName}>
        {configDone ? <HydrogenLogoBaseColor /> : <HydrogenLogoBaseBW />}
        <h1>{t('hydrogen.virtualRoutes.index.greeting', {shopName})}</h1>
        <p>{t('hydrogen.virtualRoutes.index.welcomeMessage')}</p>

        <section className="Banner">
          <div>
            <IconBanner />
            <h2>
              {configDone
                ? t('hydrogen.virtualRoutes.index.bannerConfiguredTitle')
                : t('hydrogen.virtualRoutes.index.bannerConfigureTokenTitle')}
            </h2>
          </div>
          {configDone ? (
            <p>
              <Trans
                t={t}
                i18nKey="hydrogen.virtualRoutes.index.bannerConfiguredBody"
                components={{
                  br: <br />,
                  code: <code />,
                  routesLink: <CreateRoutesLink />,
                }}
              />
            </p>
          ) : (
            <p>
              <Trans
                t={t}
                i18nKey="hydrogen.virtualRoutes.index.bannerConfigureTokenBody"
                components={{
                  br: <br />,
                  code: <code />,
                  envLink: (
                    <a
                      target="_blank"
                      rel="norefferer noopener"
                      href="https://shopify.dev/docs/custom-storefronts/hydrogen/environment-variables"
                    />
                  ),
                  routesLink: <CreateRoutesLink />,
                }}
              />
            </p>
          )}
        </section>
        <ResourcesLinks />
      </Layout>
    </>
  );
}

function CreateRoutesLink() {
  const {t} = useTranslation();

  return (
    <a
      target="_blank"
      rel="norefferer noopener"
      href="https://shopify.dev/docs/custom-storefronts/hydrogen/building/begin-development#step-4-create-a-route"
    >
      {t('hydrogen.virtualRoutes.index.createRoutesLink')}
    </a>
  );
}

function ErrorPage() {
  const {t} = useTranslation();

  return (
    <>
      <Layout
        shopName={t('hydrogen.virtualRoutes.index.defaultShopName')}
      >
        <HydrogenLogoBaseBW />
        <h1>
          {t('hydrogen.virtualRoutes.index.greeting', {
            shopName: t('hydrogen.virtualRoutes.index.defaultShopName'),
          })}
        </h1>
        <p>{t('hydrogen.virtualRoutes.index.welcomeMessage')}</p>
        <section className="Banner ErrorBanner">
          <div>
            <IconError />
            <h2>{t('hydrogen.virtualRoutes.index.errorTitle')}</h2>
          </div>
          <p>
            <Trans
              t={t}
              i18nKey="hydrogen.virtualRoutes.index.errorBody"
              components={{
                code: <code />,
                envLink: (
                  <a
                    target="_blank"
                    rel="norefferer noopener"
                    href="https://shopify.dev/docs/custom-storefronts/hydrogen/environment-variables"
                  />
                ),
              }}
            />
          </p>
        </section>
        <ResourcesLinks />
      </Layout>
    </>
  );
}

function ResourcesLinks() {
  const {t} = useTranslation();

  return (
    <>
      <section className="Links">
        <h2>{t('hydrogen.virtualRoutes.index.startBuildingHeading')}</h2>
        <ul>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen/building/collection-page"
            >
              {t('hydrogen.virtualRoutes.index.collectionTemplateLink')}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen/building/product-details-page"
            >
              {t('hydrogen.virtualRoutes.index.productTemplateLink')}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen/building/cart"
            >
              {t('hydrogen.virtualRoutes.index.cartLink')}
            </a>
          </li>
        </ul>
        <h2>{t('hydrogen.virtualRoutes.index.resourcesHeading')}</h2>
        <ul>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen"
            >
              {t('hydrogen.virtualRoutes.index.docsLink')}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen/project-structure"
            >
              {t('hydrogen.virtualRoutes.index.projectStructureLink')}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="norefferer noopener"
              href="https://shopify.dev/custom-storefronts/hydrogen/data-fetching/fetch-data"
            >
              {t('hydrogen.virtualRoutes.index.dataFetchingLink')}
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

function Layout({
  shopName,
  children,
}: {
  shopName: string;
  children: React.ReactNode;
}) {
  const {t} = useTranslation();

  return (
    <>
      <header>
        <h1>{shopName?.toUpperCase()}</h1>
        <p>
          {'\u00A0'}
          {t('hydrogen.virtualRoutes.index.devMode')}
          {'\u00A0'}
        </p>
        <nav>
          <a
            target="_blank"
            rel="norefferer noopener"
            href="https://github.com/Shopify/hydrogen"
          >
            <IconGithub />
          </a>
          <a
            target="_blank"
            rel="norefferer noopener"
            href="https://twitter.com/shopifydevs?lang=en"
          >
            <IconTwitter />
          </a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div>
          <a
            href="https://shopify.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('hydrogen.virtualRoutes.index.poweredByShopify')}
          </a>
        </div>
      </footer>
    </>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      id
    }
  }
`;
