import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {useTranslation} from 'react-i18next';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
    {
      variables: {
        language: customerAccount.i18n.language,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {t} = useTranslation();
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? t('skeleton.account.layout.welcomeName', {firstName: customer.firstName})
      : t('skeleton.account.layout.welcome')
    : t('skeleton.account.layout.accountDetails');

  return (
    <div className="account">
      <h1>{heading}</h1>
      <br />
      <AccountMenu />
      <br />
      <br />
      <Outlet context={{customer}} />
    </div>
  );
}

function AccountMenu() {
  const {t} = useTranslation();

  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  }

  return (
    <nav role="navigation">
      <NavLink to="/account/orders" style={isActiveStyle}>
        {t('skeleton.account.layout.menu.orders')} &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/profile" style={isActiveStyle}>
        &nbsp; {t('skeleton.account.layout.menu.profile')} &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/addresses" style={isActiveStyle}>
        &nbsp; {t('skeleton.account.layout.menu.addresses')} &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <Logout />
    </nav>
  );
}

function Logout() {
  const {t} = useTranslation();

  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      &nbsp;<button type="submit">{t('skeleton.account.layout.menu.signOut')}</button>
    </Form>
  );
}
