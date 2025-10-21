import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  const {t} = useTranslation();
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <PreviousLink>
              {isLoading ? t('skeleton.pagination.loading') : <span>↑ {t('skeleton.pagination.loadPrevious')}</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? t('skeleton.pagination.loading') : <span>{t('skeleton.pagination.loadMore')} ↓</span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
