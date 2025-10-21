import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import {useTranslation} from 'react-i18next';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664', // i18n-skip: Shopify GraphQL ID
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920', // i18n-skip: Shopify GraphQL ID
      resourceId: 'gid://shopify/ShopPolicy/23358046264', // i18n-skip: Shopify GraphQL ID
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY', // i18n-skip: constant
      url: '/policies/privacy-policy', // i18n-skip: URL
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688', // i18n-skip: Shopify GraphQL ID
      resourceId: 'gid://shopify/ShopPolicy/23358013496', // i18n-skip: Shopify GraphQL ID
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY', // i18n-skip: constant
      url: '/policies/refund-policy', // i18n-skip: URL
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456', // i18n-skip: Shopify GraphQL ID
      resourceId: 'gid://shopify/ShopPolicy/23358111800', // i18n-skip: Shopify GraphQL ID
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY', // i18n-skip: constant
      url: '/policies/shipping-policy', // i18n-skip: URL
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224', // i18n-skip: Shopify GraphQL ID
      resourceId: 'gid://shopify/ShopPolicy/23358079032', // i18n-skip: Shopify GraphQL ID
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY', // i18n-skip: constant
      url: '/policies/terms-of-service', // i18n-skip: URL
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
