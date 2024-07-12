import { Helmet } from 'react-helmet-async';

import BlogDetail from 'src/sections/blog/view/detail-blog';

// ----------------------------------------------------------------------

const DetailBlogPage = () => (
  <>
    <Helmet>
      <title> Blog(❁´◡`❁) </title>
    </Helmet>

    <BlogDetail />
  </>
);
export default DetailBlogPage;
