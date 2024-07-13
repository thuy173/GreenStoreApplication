import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

import InformationBaseView from 'src/sections/profile/view/information-view';

// ----------------------------------------------------------------------

const ProfilePage = () => {
  const { accessToken: currentToken } = useSelector((state) => state.auth);

  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title> Profile(❁´◡`❁) </title>
      </Helmet>

      <InformationBaseView />
    </>
  );
};
export default ProfilePage;
