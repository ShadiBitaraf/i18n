import {Analytics} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';

export default function Promotion() {
  const {t} = useTranslation();
  return (
    <div className="promotion">
      <h1>{t('hydrogen.analytics.customView.heading')}</h1>
      <Analytics.CustomView
        type="custom_promotion_viewed"
        data={{
          promotion: {
            id: '123',
          },
        }}
      />
    </div>
  );
}
