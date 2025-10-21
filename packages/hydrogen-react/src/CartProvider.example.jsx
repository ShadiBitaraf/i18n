import {CartProvider, useCart} from '@shopify/hydrogen-react';
import {useTranslation} from 'react-i18next';

export function App() {
  <CartProvider
    onLineAdd={() => {
      console.log('a line is being added');
    }}
    onLineAddComplete={() => {
      console.log('a line has been added');
    }}
  >
    <CartComponent />
  </CartProvider>;
}

function CartComponent() {
  const {linesAdd, status} = useCart();
  const {t} = useTranslation();

  const merchandise = {merchandiseId: '{id-here}'};

  return (
    <div>
      {t('hydrogenReact.cartProvider.statusLabel', {status})}
      <button onClick={() => linesAdd([merchandise])}>
        {t('hydrogenReact.cartProvider.addLineButton')}
      </button>
    </div>
  );
}
