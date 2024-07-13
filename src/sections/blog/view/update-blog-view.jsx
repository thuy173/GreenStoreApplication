import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingPage from 'src/pages/loading_page';
import BlogServices from 'src/services/BlogServices';

import UpdateBlog from '../update-blog';

const UpdateBlogView = () => {
  const { id } = useParams();

  const [dataDetail, setDataDetail] = useState(null);

  const fetchData = async () => {
    try {
      const response = await BlogServices.getDataById(id);
      if (response?.data && response?.status === 200) {
        setDataDetail(response.data);
      } else {
        console.error(response ?? 'Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <div>{dataDetail ? <UpdateBlog initialValues={dataDetail} /> : <LoadingPage />}</div>;
};

export default UpdateBlogView;
