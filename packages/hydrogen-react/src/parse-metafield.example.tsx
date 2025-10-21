import {parseMetafield, type ParsedMetafields} from '@shopify/hydrogen-react';
import type {Metafield} from '@shopify/hydrogen-react/storefront-api-types';
import {useTranslation} from 'react-i18next';

export function DateMetafield({metafield}: {metafield: Metafield}) {
  const parsedMetafield = parseMetafield<ParsedMetafields['date']>(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.dateLabel', {
        value: parsedMetafield.parsedValue?.toDateString(),
      })}
    </div>
  );
}

export function VariantReferenceMetafield({metafield}: {metafield: Metafield}) {
  const parsedMetafield =
    parseMetafield<ParsedMetafields['variant_reference']>(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.variantTitleLabel', {
        value: parsedMetafield.parsedValue?.title,
      })}
    </div>
  );
}

export function ListCollectionReferenceMetafield({
  metafield,
}: {
  metafield: Metafield;
}) {
  const parsedMetafield =
    parseMetafield<ParsedMetafields['list.collection_reference']>(metafield);
  const {t} = useTranslation();

  return (
    <div>
      {t('hydrogenReact.parseMetafield.firstCollectionTitle', {
        value: parsedMetafield.parsedValue?.[0].title,
      })}
    </div>
  );
}
