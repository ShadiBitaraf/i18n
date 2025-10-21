import {CartForm, OptimisticInput, useOptimisticData} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';

export default function Cart({line}) {
  const {t} = useTranslation();
  const optimisticId = line.id;
  const optimisticData = useOptimisticData(optimisticId);

  return (
    <div
      style={{
        // Hide the line item if the optimistic data action is remove
        // Do not remove the form from the DOM
        display: optimisticData?.action === 'remove' ? 'none' : 'block',
      }}
    >
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{
          lineIds: [line.id],
        }}
      >
        <button type="submit">
          {t('hydrogen.optimisticUi.removeButton')}
        </button>
        <OptimisticInput id={optimisticId} data={{action: 'remove'}} />
      </CartForm>
    </div>
  );
}
