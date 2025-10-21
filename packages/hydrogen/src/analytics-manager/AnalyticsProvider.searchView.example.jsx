import {Analytics} from '@shopify/hydrogen';
import {useLoaderData} from 'react-router';
import {useTranslation} from 'react-i18next';

export async function loader({request}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = String(searchParams.get('q') || '');

  return {searchTerm};
}

export default function SearchPage() {
  const {searchTerm} = useLoaderData();
  const {t} = useTranslation();
  return (
    <div className="search">
      <h1>{t('hydrogen.analytics.searchView.heading')}</h1>
      <Analytics.SearchView data={{searchTerm}} />
    </div>
  );
}
