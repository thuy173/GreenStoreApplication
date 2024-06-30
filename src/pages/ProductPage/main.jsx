// import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// import { Navigate } from 'react-router-dom';

import { ProductMain } from 'src/sections/product/view';


// ----------------------------------------------------------------------

const ProductPage = () => 
  // const { accessToken: currentToken } = useSelector((state) => state.auth);

  // if (!currentToken) {
  //   return <Navigate to="/login" />;
  // }

   (
    <>
      <Helmet>
        <title> Product(❁´◡`❁) </title>
      </Helmet>

      <ProductMain />
    </>
  )
;

export default ProductPage;
