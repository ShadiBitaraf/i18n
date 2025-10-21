import {Analytics} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';

export default function CartView() {
  const {t} = useTranslation();
  return (
    <div className="cart">
      <h1>{t('hydrogen.analytics.cartView.heading')}</h1>
      <Analytics.CartView />
    </div>
  );
}
