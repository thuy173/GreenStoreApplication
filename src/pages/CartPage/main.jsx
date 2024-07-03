import { Helmet } from 'react-helmet-async';

import CartMain from 'src/sections/cart/view/main';

// ----------------------------------------------------------------------

const CartPage = () => (
  <>
    <Helmet>
      <title> Cart(❁´◡`❁) </title>
    </Helmet>

    <CartMain />
  </>
);
export default CartPage;
