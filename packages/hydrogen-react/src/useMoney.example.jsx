import {useMoney, ShopifyProvider} from '@shopify/hydrogen-react';
import {useTranslation} from 'react-i18next';

export function App() {
  return (
    <ShopifyProvider languageIsoCode="EN" countryIsoCode="US">
      <UsingMoney />
    </ShopifyProvider>
  );
}

function UsingMoney() {
  const myMoney = {amount: '100', currencyCode: 'USD'};
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
