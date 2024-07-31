import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import ComboMain from 'src/sections/combo/view/main';

// ----------------------------------------------------------------------

const ComboPage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title> Combo(❁´◡`❁) </title>
      </Helmet>

      <ComboMain />
    </>
  );
};
export default ComboPage;
