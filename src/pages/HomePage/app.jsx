// import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// import { Navigate } from 'react-router-dom';

import { AppView } from 'src/sections/home/view';


// ----------------------------------------------------------------------

const HomePage = () => 
  // const { accessToken: currentToken } = useSelector((state) => state.auth);

  // if (!currentToken) {
  //   return <Navigate to="/login" />;
  // }

   (
    <>
      <Helmet>
        <title> Hello(❁´◡`❁) </title>
      </Helmet>

      <AppView />
    </>
  )
;

export default HomePage;
