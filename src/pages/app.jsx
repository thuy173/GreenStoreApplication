import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

const AppPage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | SkyMath </title>
      </Helmet>

      <AppView />
    </>
  );
};

export default AppPage;
