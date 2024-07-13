import { Helmet } from 'react-helmet-async';

import CreateBlog from 'src/sections/blog/view/create-blog';

// ----------------------------------------------------------------------

const CreateBlogPage = () => (
  <>
    <Helmet>
      <title> Create blog </title>
    </Helmet>

    <CreateBlog />
  </>
);
export default CreateBlogPage;
