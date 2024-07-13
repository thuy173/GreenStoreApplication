import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import OrderView from 'src/sections/order/view/main';

// ----------------------------------------------------------------------

const OrderPage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title> Order(❁´◡`❁) </title>
      </Helmet>

      <OrderView />
    </>
  );
};
export default OrderPage;
