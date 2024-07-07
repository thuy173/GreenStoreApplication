import { Helmet } from 'react-helmet-async';

import InformationBaseView from 'src/sections/profile/view/information-view';

// ----------------------------------------------------------------------

const ProfilePage = () => (
  <>
    <Helmet>
      <title> Profile(❁´◡`❁) </title>
    </Helmet>

    <InformationBaseView />
  </>
);
export default ProfilePage;
