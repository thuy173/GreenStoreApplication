import { Helmet } from 'react-helmet-async';

import BlogMain from 'src/sections/blog/view/main';

// ----------------------------------------------------------------------

const BlogPage = () => (
  <>
    <Helmet>
      <title> Blog(❁´◡`❁) </title>
    </Helmet>

    <BlogMain />
  </>
);
export default BlogPage;
