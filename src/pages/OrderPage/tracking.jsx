import { Helmet } from 'react-helmet-async';

import OrderTracking from 'src/sections/order/view/tracking';

// ----------------------------------------------------------------------

const OrderTrackingPage = () => (
    <>
      <Helmet>
        <title> Tracking(❁´◡`❁) </title>
      </Helmet>

      <OrderTracking />
    </>
  );

export default OrderTrackingPage;
