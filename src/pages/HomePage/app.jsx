import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const HomePage = () => (
  <>
    <Helmet>
      <title> Hello(❁´◡`❁) </title>
    </Helmet>

    <AppView />
  </>
);
export default HomePage;
