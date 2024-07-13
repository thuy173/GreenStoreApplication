import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import CartMain from 'src/sections/cart/view/main';

// ----------------------------------------------------------------------

const CartPage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title> Cart(❁´◡`❁) </title>
      </Helmet>

      <CartMain />
    </>
  );
};
export default CartPage;
