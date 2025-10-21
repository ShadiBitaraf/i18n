import {parseMetafield} from '@shopify/hydrogen-react';
import {useTranslation} from 'react-i18next';

export function DateMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.dateLabel', {
        value: parsedMetafield.parsedValue?.toDateString(),
      })}
    </div>
  );
}

export function VariantReferenceMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.variantTitleLabel', {
        value: parsedMetafield.parsedValue?.title,
      })}
    </div>
  );
}

export function ListCollectionReferenceMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.firstCollectionTitle', {
        value: parsedMetafield.parsedValue?.[0].title,
      })}
    </div>
  );
}
