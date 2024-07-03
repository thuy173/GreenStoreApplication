import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingPage from 'src/pages/loading_page';
import ProductServices from 'src/services/ProductServices';

import ProductDetail from './product-detail';

const ProductDetailView = () => {
  const { id } = useParams();

  const [dataDetail, setDataDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductServices.getDataById(id);
        if (response?.data && response?.status === 200) {
          setDataDetail(response.data);
        } else {
          console.error(response ?? 'Unexpected response structure');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return <div>{dataDetail ? <ProductDetail initialValues={dataDetail} /> : <LoadingPage />}</div>;
};

export default ProductDetailView;
