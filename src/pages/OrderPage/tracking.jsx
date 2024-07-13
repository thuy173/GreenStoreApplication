import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import OrderTracking from 'src/sections/order/view/tracking';

// ----------------------------------------------------------------------

const OrderTrackingPage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title> Tracking(❁´◡`❁) </title>
      </Helmet>

      <OrderTracking />
    </>
  );
};
export default OrderTrackingPage;
