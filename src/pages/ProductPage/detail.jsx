import { Helmet } from 'react-helmet-async';

import ProductDetailView from 'src/sections/product/view/product-detail-view';

// ----------------------------------------------------------------------

const ProductDetailPage = () => (
  <>
    <Helmet>
      <title> Product detail(❁´◡`❁) </title>
    </Helmet>

    <ProductDetailView />
  </>
);
export default ProductDetailPage;
