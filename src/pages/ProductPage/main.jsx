import { Helmet } from 'react-helmet-async';

import { ProductMain } from 'src/sections/product/view';

// ----------------------------------------------------------------------

const ProductPage = () => (
  <>
    <Helmet>
      <title> Product(❁´◡`❁) </title>
    </Helmet>

    <ProductMain />
  </>
);
export default ProductPage;
