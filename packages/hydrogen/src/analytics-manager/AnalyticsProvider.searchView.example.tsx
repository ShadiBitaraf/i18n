import {Analytics} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import {useTranslation} from 'react-i18next';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = String(searchParams.get('q') || '');

  return {searchTerm};
}

export default function SearchPage() {
  const {searchTerm} = useLoaderData<typeof loader>();
  const {t} = useTranslation();
  return (
    <div className="search">
      <h1>{t('hydrogen.analytics.searchView.heading')}</h1>
      <Analytics.SearchView data={{searchTerm}} />
    </div>
  );
}
