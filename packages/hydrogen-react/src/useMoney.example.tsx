import {useMoney, ShopifyProvider} from '@shopify/hydrogen-react';
import type {MoneyV2} from '@shopify/hydrogen-react/storefront-api-types';
import {useTranslation} from 'react-i18next';

export function App() {
  return (
    // @ts-expect-error intentionally missing the rest of the props
    <ShopifyProvider countryIsoCode="US" languageIsoCode="EN">
      <UsingMoney />
    </ShopifyProvider>
  );
}

function UsingMoney() {
  const myMoney = {amount: '100', currencyCode: 'USD'} satisfies MoneyV2;
  const money = useMoney(myMoney);
  const {t} = useTranslation();
  return (
    <>
      <div>
        {t('hydrogenReact.useMoney.localized', {
          value: money.localizedString,
        })}
      </div>
      <div>
        {t('hydrogenReact.useMoney.withoutTrailingZeros', {
          value: money.withoutTrailingZeros,
        })}
      </div>
    </>
  );
}
