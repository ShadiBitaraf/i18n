import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useLoaderData, Link} from 'react-router';
import {useTranslation} from 'react-i18next';

export async function loader({request, context: {storefront}}) {
  const variables = getPaginationVariables(request, {pageBy: 8});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables,
  });

  return {products: data.products};
}

export default function List() {
  const {products} = useLoaderData();
  const {t} = useTranslation();

  return (
    <Pagination connection={products}>
      {({nodes, PreviousLink, NextLink}) => (
        <>
          <PreviousLink>
            {t('hydrogen.pagination.single.previous')}
          </PreviousLink>
          <div>
            {nodes.map((product) => (
              <Link key={product.id} to={`/products/${product.handle}`}>
                {product.title}
              </Link>
            ))}
          </div>
          <NextLink>{t('hydrogen.pagination.single.next')}</NextLink>
        </>
      )}
    </Pagination>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes { id
        title
        handle
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
