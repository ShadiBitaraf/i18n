import {Link} from 'react-router';
import {CartForm, useOptimisticCart} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';

// Root loader returns the cart data
export async function loader({context}) {
  return {
    cart: context.cart.get(),
  };
}

// The cart component renders each line item in the cart.
export function Cart({cart}) {
  // `useOptimisticCart` adds optimistic line items to the cart.
  // These line items are displayed in the cart until the server responds.
  const optimisticCart = useOptimisticCart(cart);
  const {t} = useTranslation();

  if (!optimisticCart?.lines?.nodes?.length)
    return <p>{t('hydrogen.optimisticUi.nothingInCart')}</p>;

  return optimisticCart.lines.nodes.map((line) => (
    <div key={line.id}>
      <Link to={`/products${line.merchandise.product.handle}`}>
        {line.merchandise.product.title}
      </Link>
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{lineIds: [line.id]}}
      >
        {/* Each line item has an `isOptimistic` property. Optimistic line items
        should have actions disabled */}
        <button type="submit" disabled={!!line.isOptimistic}>
          {t('hydrogen.optimisticUi.removeButton')}
        </button>
      </CartForm>
    </div>
  ));
}
