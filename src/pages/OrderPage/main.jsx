import { Helmet } from 'react-helmet-async';

import OrderView from 'src/sections/order/view/main';

// ----------------------------------------------------------------------

const OrderPage = () => (
  <>
    <Helmet>
      <title> Order(❁´◡`❁) </title>
    </Helmet>

    <OrderView />
  </>
);
export default OrderPage;
